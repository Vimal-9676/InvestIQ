import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp, TrendingDown, Newspaper, FileText, Bell, Activity, Sparkles, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import TopBar from '../TopBar';
import { api } from '../../../services/api';

const AiWatchlist = () => {
  const [expandedStock, setExpandedStock] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchWatchlist = async () => {
      try {
        const data = await api.stocks.getWatchlist();
        if (isMounted) {
          setWatchlist(data);
          if (data.length > 0) setExpandedStock(data[0].ticker);
        }
      } catch (err) {
        if (isMounted) setError("Failed to load watchlist data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchWatchlist();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center h-full">
        <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center h-full p-8 text-center">
        <p className="text-rose-500 font-medium mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search stocks to track..." />
      
      <header className="mb-8 mt-2 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Watchlist</h1>
          <p className="text-slate-500">Intelligent tracking of News, Earnings, and Price Action for your favorite stocks.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg flex items-center transition-colors">
          <Eye className="w-4 h-4 mr-2" />
          Watch New Stock
        </button>
      </header>

      <div className="space-y-4">
        {watchlist.map((stock) => (
          <div key={stock.ticker} className={`bg-white rounded-2xl border transition-all duration-300 ${expandedStock === stock.ticker ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}>
            
            {/* Header / Condensed View */}
            <div 
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedStock(expandedStock === stock.ticker ? null : stock.ticker)}
            >
              <div className="flex items-center space-x-6 w-1/3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{stock.ticker}</h3>
                  <p className="text-xs text-slate-500">{stock.name}</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{stock.price}</div>
                  <div className={`text-xs font-medium flex items-center ${stock.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stock.change}
                  </div>
                </div>
              </div>

              <div className="flex-1 px-8 hidden md:block">
                <div className="flex items-center text-sm font-medium text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit">
                  <Sparkles className="w-4 h-4 mr-1.5 text-indigo-500" />
                  {stock.aiStatus}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <div className="text-xs text-slate-500 mb-1">AI Sentiment</div>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${stock.aiSentiment > 70 ? 'bg-emerald-500' : stock.aiSentiment < 40 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                      style={{ width: `${stock.aiSentiment}%` }}
                    ></div>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  {expandedStock === stock.ticker ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Expanded AI Tracking View */}
            {expandedStock === stock.ticker && (
              <div className="border-t border-slate-100 p-6 bg-slate-50/50 rounded-b-2xl animate-in slide-in-from-top-2 duration-300">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  AI Tracking Analysis
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* News Module */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <Newspaper className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-slate-800">News Sentiment</h5>
                    </div>
                    <ul className="space-y-3">
                      {stock.news.map((item, idx) => (
                        <li key={idx} className="flex flex-col border-l-2 pl-3 border-indigo-200">
                          <span className="text-[10px] text-slate-400 font-medium mb-0.5">{item.time}</span>
                          <span className="text-sm text-slate-700">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Earnings Module */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-slate-800">Earnings Context</h5>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {stock.earnings}
                    </p>
                    <button className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center transition-colors">
                      View Full Transcript Analysis <ChevronDown className="w-3 h-3 ml-1 -rotate-90" />
                    </button>
                  </div>

                  {/* Price Action Module */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-3">
                        <Bell className="w-4 h-4" />
                      </div>
                      <h5 className="font-bold text-slate-800">Price Action Alerts</h5>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {stock.priceAction}
                    </p>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span>RSI: <strong className="text-slate-800">58.4</strong></span>
                      <span>MACD: <strong className="text-emerald-600">Bullish</strong></span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default AiWatchlist;
