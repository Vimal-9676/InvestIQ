import { useState, useEffect } from 'react';
import { Search, Bell, Plus, TrendingUp, TrendingDown, Sparkles, Star } from 'lucide-react';
import axios from 'axios';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { formatINR, getRate } from '../../utils/currency';

const MainPanel = ({ currentSymbol, setCurrentSymbol, toggleSidebar, toggleChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [quote, setQuote] = useState(null);
  const [history, setHistory] = useState([]);
  const [news, setNews] = useState([]);
  const [timeframe, setTimeframe] = useState('1M');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showDematPopup, setShowDematPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quoteRes, histRes, newsRes, watchlistRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/stocks/quote?symbol=${currentSymbol}`),
          axios.get(`http://localhost:5000/api/stocks/history?symbol=${currentSymbol}&range=${timeframe}`),
          axios.get(`http://localhost:5000/api/stocks/news?symbol=${currentSymbol}`),
          axios.get(`http://localhost:5000/api/watchlist`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
        ]);
        setQuote(quoteRes.data);
        setHistory(histRes.data);
        setNews(newsRes.data);
        const watchData = watchlistRes.data.map(item => item.symbol);
        setIsInWatchlist(watchData.includes(currentSymbol));
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
  }, [currentSymbol, timeframe]);

  const toggleWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (isInWatchlist) {
        await axios.delete(`http://localhost:5000/api/watchlist/${currentSymbol}`, { headers: { Authorization: `Bearer ${token}` }});
        setIsInWatchlist(false);
      } else {
        await axios.post(`http://localhost:5000/api/watchlist`, { symbol: currentSymbol }, { headers: { Authorization: `Bearer ${token}` }});
        setIsInWatchlist(true);
      }
    } catch (err) {
      console.error('Failed to toggle watchlist', err);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const search = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stocks/search?q=${searchQuery}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSymbol = (symbol) => {
    setCurrentSymbol(symbol);
    setSearchQuery('');
    setSearchResults([]);
  };

  const isBull = quote?.regularMarketChange >= 0;
  const colorClass = isBull ? 'text-green-700' : 'text-red-700';
  const bgClass = isBull ? 'bg-green-100' : 'bg-red-100';
  const chartColor = isBull ? '#22c55e' : '#ef4444';
  const currency = quote?.currency || 'USD';

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e12) return '₹' + (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9)  return '₹' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6)  return '₹' + (num / 1e6).toFixed(2) + 'M';
    return formatINR(num, currency);
  };

  // Convert price to INR for display
  const priceINR = formatINR(quote?.regularMarketPrice, currency);
  const highINR  = formatINR(quote?.fiftyTwoWeekHigh,  currency);

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20 relative">
      {/* Demat Popup Modal */}
      {showDematPopup && (
        <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Connect Broker</h3>
            <p className="text-slate-500 mb-6">Please add a Demat account to start investing in {currentSymbol}.</p>
            <div className="space-y-3">
              <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-700 transition-colors">
                Connect Zerodha
              </button>
              <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-700 transition-colors">
                Connect Groww
              </button>
            </div>
            <button 
              onClick={() => setShowDematPopup(false)}
              className="mt-6 w-full py-3 text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Top bar */}
      <header className="flex items-center justify-between mb-8 relative z-30">
        <button className="lg:hidden p-2 mr-4 text-slate-500 hover:bg-slate-100 rounded-md" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickers, companies..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
          {searchResults.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
              {searchResults.map((res) => (
                <div 
                  key={res.symbol} 
                  onClick={() => handleSelectSymbol(res.symbol)}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center"
                >
                  <span className="font-bold">{res.symbol}</span>
                  <span className="text-sm text-slate-500">{res.shortname}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="lg:hidden p-2 ml-4 text-indigo-600 hover:bg-indigo-50 rounded-md" onClick={toggleChat}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </header>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 space-y-4 sm:space-y-0">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{quote?.shortName || currentSymbol}</h1>
            <button onClick={toggleWatchlist} className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors ${isInWatchlist ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}>
              <Star className={`w-6 h-6 ${isInWatchlist ? 'fill-current' : ''}`} />
            </button>
          </div>
          <p className="text-sm text-slate-500">{quote?.longName || currentSymbol}</p>
        </div>
        <button 
          onClick={() => setShowDematPopup(true)}
          className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm transition-all"
        >
          Invest Now
        </button>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-8 min-w-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 space-y-4 md:space-y-0">
          <div>
            <div className="flex flex-row items-end space-x-3 mb-2 flex-wrap">
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">{priceINR}</h2>
              <div className={`flex items-center px-2.5 py-1 ${bgClass} ${colorClass} text-sm font-semibold rounded-md mb-1 sm:mb-1.5`}>
                {isBull ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {quote?.regularMarketChangePercent?.toFixed(2)}%
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {['1D', '1W', '1M', 'YTD'].map((tf) => (
              <button 
                key={tf} 
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${timeframe === tf ? 'bg-indigo-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Wrapper Container */}
        <div className="h-[300px] sm:h-[400px] w-full mt-4 -ml-4 sm:-ml-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide={true} />
              <YAxis domain={['auto', 'auto']} hide={true} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(label) => new Date(label).toLocaleString()}
                formatter={(value) => [
                  formatINR(Number(value), currency),
                  'Price'
                ]}
              />
              <Area type="monotone" dataKey="close" stroke={chartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Market Approach Box */}
        <div className={`rounded-xl p-4 flex items-start space-x-4 border ${isBull ? 'bg-green-50/60 border-green-100' : 'bg-red-50/60 border-red-100'}`}>
          <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isBull ? 'text-green-600' : 'text-red-600'}`} />
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">Market Sentiment: {isBull ? 'BULLISH' : 'BEARISH'}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Based on the current daily trend, the market is exhibiting a {isBull ? 'bullish' : 'bearish'} approach for {currentSymbol}.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <h3 className="text-lg font-bold text-slate-900 mb-4">Key Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Market Cap',  value: formatNumber(quote?.marketCap) },
          { label: 'Volume',       value: formatNumber(quote?.regularMarketVolume) },
          { label: 'P/E Ratio',    value: quote?.trailingPE?.toFixed(2) || 'N/A' },
          { label: '52W High',     value: highINR },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm min-w-0 flex flex-col justify-center">
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 break-words">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* News Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></span>
          Latest on {currentSymbol}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.slice(0, 6).map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noreferrer" className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full min-w-0">
              <div>
                <p className="text-xs font-semibold text-indigo-600 mb-2 truncate">{item.publisher}</p>
                <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-3 mb-3">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-400">
                {new Date(item.providerPublishTime).toLocaleDateString()}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainPanel;
