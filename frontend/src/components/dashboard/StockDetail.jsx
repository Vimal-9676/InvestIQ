import { Search, Bell, Plus, TrendingUp, TrendingDown, Sparkles, RefreshCw } from 'lucide-react';
import { useDashboard } from '../Dashboard';
import TopBar from './TopBar';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const StockDetail = () => {
  const { openChatWithContext } = useDashboard();
  const { ticker } = useParams();
  
  const currentTicker = ticker ? ticker.toUpperCase() : 'RELIANCE';
  
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.stocks.getFundamentals(currentTicker);
        if (isMounted) {
          setStock({
            ...data,
            analysis: `Algorithmic analysis for ${currentTicker} shows mixed signals. Institutional flow is currently balanced.`
          });
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch stock data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStockData();

    return () => { isMounted = false; };
  }, [currentTicker]);

  useEffect(() => {
    if (stock) {
      openChatWithContext(`Provide a detailed growth analysis and future outlook for ${stock.name} (${currentTicker}) based on the recent chart momentum.`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock?.ticker]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center h-full">
        <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
      </main>
    );
  }

  if (error || !stock) {
    return (
      <main className="flex-1 flex items-center justify-center h-full">
        <div className="text-rose-500 font-medium">{error || "Stock not found"}</div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search stocks...">
        <button className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Watchlist
        </button>
      </TopBar>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{currentTicker} Analytics</h1>
          <p className="text-sm text-slate-500">{stock.name} · {stock.sector}</p>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-end space-x-4 mb-2">
              <h2 className="text-5xl font-bold text-slate-900 tracking-tight">₹{stock.price.toFixed(2)}</h2>
              <div className={`flex items-center px-2.5 py-1 text-sm font-semibold rounded-md mb-1.5 ${stock.change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stock.change > 0 ? '+' : ''}{stock.change}%
              </div>
            </div>
            <p className="text-xs text-slate-500">Market Open · Updated 2m ago</p>
          </div>
          
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            {['1D', '1W', '1M', 'YTD'].map((tf, i) => (
              <button 
                key={tf} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${i === 1 ? 'bg-indigo-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Wrapper Container */}
        <div className={`w-full h-64 rounded-xl relative overflow-hidden mb-6 flex items-end ${stock.change >= 0 ? 'bg-green-50/30' : 'bg-red-50/30'}`}>
           {/* Mock Chart Line */}
           <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={`w-full h-full fill-none ${stock.change >= 0 ? 'stroke-green-500' : 'stroke-red-500'}`} strokeWidth="1.5">
              <path d={stock.change >= 0 ? "M0,35 L10,33 L20,38 L30,25 L40,28 L50,15 L60,20 L70,10 L80,12 L90,2 L100,0" : "M0,5 L10,8 L20,3 L30,15 L40,12 L50,25 L60,20 L70,30 L80,28 L90,38 L100,40"} />
           </svg>
        </div>

        {/* AI Growth Analysis Box */}
        <div 
          className="bg-indigo-50/60 hover:bg-indigo-100/60 cursor-pointer rounded-xl p-4 flex items-start space-x-4 border border-indigo-100/50 transition-colors"
          onClick={() => openChatWithContext(`Provide a detailed growth analysis and future outlook for ${stock.name} (${currentTicker}) based on the recent chart momentum.`)}
        >
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 mb-1">AI Growth Analysis (Click to discuss)</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {stock.analysis}
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <h3 className="text-lg font-bold text-slate-900 mb-4 mt-4">Key Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Market Cap</p>
          <p className="text-2xl font-bold text-slate-900">{stock.marketCap}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">P/E Ratio</p>
          <p className="text-2xl font-bold text-slate-900">{stock.peRatio}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">EPS (TTM)</p>
          <p className="text-2xl font-bold text-slate-900">{stock.eps}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">52W Range</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm font-medium">{stock.low52}</span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-indigo-800 rounded-full ml-auto"></div>
            </div>
            <span className="text-sm font-medium">{stock.high52}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StockDetail;
