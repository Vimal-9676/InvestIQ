const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'frontend/src/components/dashboard/views');

const homeView = `import { Search, TrendingUp, TrendingDown, Rocket } from 'lucide-react';
import { useState } from 'react';

export const HomeView = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
              placeholder="Search for stocks, ETFs, etc..." 
              className="w-full p-4 pl-12 rounded-2xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <Search className="w-6 h-6 text-slate-400 absolute left-4 top-4" />
          </div>
        </form>

        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-emerald-500 mr-2" /> Top Gainers Today
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {['TSLA', 'META', 'PLTR'].map(ticker => (
            <div key={ticker} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => onSearch(ticker)}>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{ticker}</h3>
                <p className="text-sm text-slate-500">Tech</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-500">+4.2%</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Rocket className="w-6 h-6 text-indigo-500 mr-2" /> Upcoming IPOs
        </h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Stripe</h3>
              <p className="text-sm text-slate-500">Fintech</p>
            </div>
            <p className="font-medium text-slate-700">Est. Q4 2026</p>
          </div>
          <div className="p-5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Databricks</h3>
              <p className="text-sm text-slate-500">AI / Cloud</p>
            </div>
            <p className="font-medium text-slate-700">Est. Q1 2027</p>
          </div>
        </div>
      </div>
    </div>
  );
};
`;

const watchlistView = `import { Star, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

export const WatchlistView = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/watchlist', {
          headers: { Authorization: \`Bearer \${token}\` }
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

        <div className="flex items-center mb-6">
          <Star className="w-8 h-8 text-amber-400 mr-3 fill-amber-400" />
          <h1 className="text-3xl font-bold text-slate-900">Watchlist</h1>
        </div>
        
        {watchlist.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-500">Your watchlist is empty. Search for a stock and click the star to add it.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {watchlist.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => onSearch(item.symbol)}>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{item.symbol}</h3>
                  <p className="text-sm text-slate-500">Market Price: {item.price ? \`$\${item.price.toFixed(2)}\` : 'Loading...'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 mb-1">Past Week P/L</p>
                  <p className={\`font-bold \${item.weeklyChange >= 0 ? 'text-emerald-500' : 'text-red-500'}\`}>
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
`;

const earningsAnalyzerView = `import { FileText, Upload as UploadIcon, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import axios from 'axios';

export const EarningsAnalyzerView = () => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    setIsUploading(true);
    setAnalysis(null);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/analyze-earnings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error(error);
      alert('Failed to analyze document.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <FileText className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-slate-900">Earnings Call Analyzer</h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center mb-8">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
          <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <UploadIcon className="w-10 h-10 text-indigo-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Upload Earnings Transcript</h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">Upload a PDF transcript of a company's earnings call. The AI will analyze it to extract a summary, key insights, risks, and opportunities.</p>
          <button 
            onClick={handleUploadClick} 
            disabled={isUploading}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center mx-auto"
          >
            {isUploading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <UploadIcon className="w-5 h-5 mr-2" />}
            {isUploading ? 'Analyzing Document...' : 'Select PDF File'}
          </button>
        </div>

        {analysis && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-indigo-900 mb-2 border-b pb-2">AI Summary</h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{analysis.summary}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-700 mb-2 border-b pb-2">Key Insights</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                {analysis.insights?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-600 mb-2 border-b pb-2">Opportunities</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                {analysis.opportunities?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-600 mb-2 border-b pb-2">Risks</h3>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                {analysis.risks?.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`;

const bullBearView = `import { TrendingUp, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export const BullBearView = () => {
  const [ticker, setTicker] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/bull-bear', { ticker: ticker.trim().toUpperCase() });
      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error(error);
      alert('Failed to generate analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-slate-900">Bull vs Bear Analysis</h1>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <form onSubmit={handleAnalyze} className="flex gap-4">
            <input 
              type="text" 
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="e.g. Should I invest in TCS?" 
              className="flex-1 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[140px]"
            >
              {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Analyze</>}
            </button>
          </form>
        </div>

        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">Bull Case</h3>
              <p className="text-emerald-900 leading-relaxed whitespace-pre-wrap">{analysis.bull}</p>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">Bear Case</h3>
              <p className="text-red-900 leading-relaxed whitespace-pre-wrap">{analysis.bear}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 lg:col-span-2">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">Risks & Considerations</h3>
              <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">{analysis.risks}</p>
              <p className="text-xs text-amber-700 mt-4 italic font-medium">* No direct financial advice is provided. This analysis is based on available market data.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`;

const newsView = `import { Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const NewsView = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stocks/search?query=market');
        if (res.data && res.data.news) {
          setNews(res.data.news);
        }
      } catch (err) {
        console.error('Failed to fetch market news', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Newspaper className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-slate-900">Latest Market News</h1>
        </div>
        
        {loading ? (
          <div className="text-center p-10 text-slate-500">Loading latest news...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noreferrer" className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 mb-2 truncate">{item.publisher}</p>
                  <h4 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-indigo-700 transition-colors line-clamp-3 mb-3">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(item.providerPublishTime).toLocaleString()}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
`;

fs.writeFileSync(path.join(viewsDir, 'HomeView.jsx'), homeView);
fs.writeFileSync(path.join(viewsDir, 'WatchlistView.jsx'), watchlistView);
fs.writeFileSync(path.join(viewsDir, 'EarningsAnalyzerView.jsx'), earningsAnalyzerView);
fs.writeFileSync(path.join(viewsDir, 'BullBearView.jsx'), bullBearView);
fs.writeFileSync(path.join(viewsDir, 'NewsView.jsx'), newsView);

console.log('Views generated successfully.');
