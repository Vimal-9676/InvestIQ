import { Newspaper, ExternalLink, Clock, RefreshCw, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORIES = ['All', 'Markets', 'Economy', 'Tech', 'Earnings'];

const getRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  return `${days}d ago`;
};

// Map publisher names to short category labels
const getCategory = (publisher = '') => {
  const p = publisher.toLowerCase();
  if (p.includes('bloomberg') || p.includes('reuters') || p.includes('ft')) return 'Markets';
  if (p.includes('tech') || p.includes('wired') || p.includes('verge')) return 'Tech';
  if (p.includes('economic') || p.includes('mint') || p.includes('business')) return 'Economy';
  return 'Markets';
};

const NewsCard = ({ item, featured }) => {
  const category = getCategory(item.publisher);
  const time = getRelativeTime(item.providerPublishTime * 1000 || item.providerPublishTime);

  if (featured) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="md:col-span-2 group bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 flex flex-col justify-between min-h-[180px] hover:shadow-xl transition-all"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold bg-white/20 text-white px-2.5 py-1 rounded-full">{category}</span>
            <span className="text-xs text-indigo-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />{time}
            </span>
          </div>
          <h3 className="text-white font-bold text-lg leading-snug group-hover:text-indigo-200 transition-colors line-clamp-3">
            {item.title}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-indigo-300 text-xs font-semibold">{item.publisher}</span>
          <ExternalLink className="w-4 h-4 text-indigo-300 group-hover:text-white transition-colors" />
        </div>
      </a>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md hover:border-indigo-200 transition-all"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{category}</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />{time}
          </span>
        </div>
        <h3 className="text-slate-800 font-semibold text-sm leading-snug group-hover:text-indigo-700 transition-colors line-clamp-3 mt-2">
          {item.title}
        </h3>
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
        <span className="text-[11px] text-slate-400 font-medium truncate">{item.publisher}</span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
      </div>
    </a>
  );
};

export const NewsView = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/stocks/market-news');
      if (res.data) {
        setNews(res.data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch market news', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const filtered = activeCategory === 'All'
    ? news
    : news.filter(n => getCategory(n.publisher) === activeCategory);

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
              <Newspaper className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Market News</h1>
              {lastUpdated && (
                <p className="text-xs text-slate-400">Updated {lastUpdated.toLocaleTimeString()}</p>
              )}
            </div>
          </div>
          <button
            onClick={fetchNews}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-sm text-slate-400 self-center">
            {filtered.length} articles
          </span>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`rounded-2xl bg-slate-200 animate-pulse ${i === 0 ? 'col-span-2 h-44' : 'h-36'}`} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No articles found for this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, i) => (
              <NewsCard key={i} item={item} featured={i === 0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
