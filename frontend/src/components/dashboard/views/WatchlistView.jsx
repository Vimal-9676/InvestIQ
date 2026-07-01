import { Star, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { formatINR } from '../../../utils/currency';

export const WatchlistView = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/watchlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWatchlist(res.data);
      } catch (err) {
        console.error('Failed to fetch watchlist', err);
      }
    };
    fetchWatchlist();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim().toUpperCase());
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="mb-8 relative">
          <div className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search to add to watchlist..." 
              className="w-full p-4 pl-12 rounded-2xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <Search className="w-6 h-6 text-slate-400 absolute left-4 top-4" />
          </div>
        </form>

        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Watchlist</h1>
            <p className="text-slate-500 text-sm mt-1">Track your favorite stocks in real-time</p>
          </div>
        </div>
        
        {watchlist.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium text-lg">Your watchlist is empty.</p>
            <p className="text-slate-400 text-sm mt-2">Search for a stock above and click the star to add it.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {watchlist.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => onSearch(item.symbol)}
                className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 cursor-pointer transition-all flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                    <Search className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{item.symbol}</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                      Market Price: {item.price ? formatINR(item.price, item.currency || 'USD') : 'Loading...'}
                    </p>
                  </div>
                </div>
                
                <div className="text-right bg-slate-50 px-4 py-2 rounded-xl">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5 font-semibold">Weekly P/L</p>
                  <p className={`font-bold text-base ${item.weeklyChange >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {item.weeklyChange >= 0 ? '+' : ''}{item.weeklyChange?.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
