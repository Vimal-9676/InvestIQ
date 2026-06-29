import { Search, TrendingUp, TrendingDown, Rocket, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatINR } from '../../../utils/currency';

const API = 'http://localhost:5001';

const INDEX_META = {
  '^NSEI':  { label: 'NIFTY 50',    flag: '🇮🇳', gradient: 'from-indigo-600 to-blue-500' },
  '^BSESN': { label: 'BSE SENSEX',  flag: '🇮🇳', gradient: 'from-purple-600 to-indigo-500' },
  '^GSPC':  { label: 'S&P 500',     flag: '🇺🇸', gradient: 'from-sky-600 to-cyan-500' },
};

export const HomeView = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [indices, setIndices] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [loadingIndices, setLoadingIndices] = useState(true);
  const [loadingGainers, setLoadingGainers] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAll = async () => {
    setLoadingIndices(true);
    setLoadingGainers(true);

    // Fetch indices
    try {
      const symbols = ['^NSEI', '^BSESN', '^GSPC'];
      const results = await Promise.all(symbols.map(sym =>
        axios.get(`${API}/api/stocks/quote?symbol=${sym}`).catch(() => null)
      ));
      setIndices(results.filter(Boolean).map(r => r.data));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch indices', err);
    } finally {
      setLoadingIndices(false);
    }

    // Fetch top gainers
    try {
      const res = await axios.get(`${API}/api/stocks/top-gainers`);
      setTopGainers(res.data);
    } catch (err) {
      console.error('Failed to fetch top gainers', err);
    } finally {
      setLoadingGainers(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) onSearch(searchTerm.trim().toUpperCase());
  };

  const formatPrice = (p) => {
    if (!p) return '—';
    return p.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto">

        {/* Hero search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Market Overview</h1>
          <p className="text-slate-500 text-sm mb-4">Real-time indices & top movers</p>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks, ETFs, companies..."
                className="w-full p-4 pl-12 rounded-2xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            </div>
          </form>
        </div>

        {/* ── Indices ── */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-800">Global Indices</h2>
          <button
            onClick={fetchAll}
            className="flex items-center text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Refresh'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {loadingIndices
            ? [0, 1, 2].map(i => (
                <div key={i} className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
              ))
            : indices.map((idx) => {
                const meta = INDEX_META[idx.symbol] || { label: idx.symbol, flag: '', gradient: 'from-slate-600 to-slate-500' };
                const up = (idx.regularMarketChange ?? 0) >= 0;
                return (
                  <div key={idx.symbol} className={`bg-gradient-to-br ${meta.gradient} text-white p-5 rounded-2xl shadow-md`}>
                    <div className="flex flex-col mb-1">
                      <div className="flex justify-between items-center w-full mb-1">
                        <p className="text-xs font-semibold opacity-80">{meta.flag} {meta.label}</p>
                        <span className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md ${up ? 'bg-white/20' : 'bg-red-500/30'} text-white flex-shrink-0 ml-2`}>
                          {up ? '▲' : '▼'} {Math.abs(idx.regularMarketChangePercent ?? 0).toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black mt-1 tracking-tight truncate">{formatPrice(idx.regularMarketPrice)}</p>
                    </div>
                    <p className="text-xs opacity-70">
                      {up ? '+' : ''}{(idx.regularMarketChange ?? 0).toFixed(2)} today
                    </p>
                  </div>
                );
              })
          }
        </div>

        {/* ── Top Gainers ── */}
        <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 text-emerald-500 mr-2" />
          Top Gainers Today
        </h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="hidden sm:block sm:col-span-1">#</span>
            <span className="col-span-5 sm:col-span-4">Ticker</span>
            <span className="col-span-4 text-right">Price</span>
            <span className="col-span-3 text-right">Change</span>
          </div>

          {loadingGainers
            ? [0,1,2,3,4,5,6].map(i => (
                <div key={i} className="px-5 py-4 border-b border-slate-50 flex items-center space-x-4">
                  <div className="h-4 bg-slate-200 rounded w-full animate-pulse" />
                </div>
              ))
            : topGainers.length === 0
              ? (
                <div className="px-5 py-8 text-center text-slate-400 text-sm">
                  No data available — market may be closed
                </div>
              )
              : topGainers.map((g, idx) => {
                  const up = (g.regularMarketChangePercent ?? 0) >= 0;
                  return (
                    <div
                      key={g.symbol}
                      onClick={() => onSearch(g.symbol)}
                      className="grid grid-cols-12 gap-1 px-5 py-4 border-b border-slate-50 hover:bg-indigo-50/50 cursor-pointer transition-colors items-center"
                    >
                      <span className="hidden sm:block sm:col-span-1 text-xs text-slate-400 font-medium">{idx + 1}</span>
                      <div className="col-span-5 sm:col-span-4">
                        <p className="font-bold text-slate-800 text-sm">{g.symbol}</p>
                        <p className="text-xs text-slate-400 truncate pr-2">{g.shortName}</p>
                      </div>
                      <span className="col-span-4 text-right font-semibold text-slate-800 text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                        {formatINR(g.regularMarketPrice, g.currency || 'USD')}
                      </span>
                      <div className="col-span-3 flex justify-end pl-1">
                        <span className={`text-[10px] sm:text-xs font-bold px-1.5 py-1 rounded-lg flex items-center whitespace-nowrap ${up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                          {up ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />}
                          {up ? '+' : ''}{(g.regularMarketChangePercent ?? 0).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  );
                })
          }
        </div>

        {/* ── Upcoming IPOs ── */}
        <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
          <Rocket className="w-5 h-5 text-indigo-500 mr-2" />
          Upcoming IPOs
        </h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {[
            { name: 'Stripe', sector: 'Fintech', est: 'Est. Q4 2026' },
            { name: 'Databricks', sector: 'AI / Cloud', est: 'Est. Q1 2027' },
            { name: 'Waymo', sector: 'Autonomous Vehicles', est: 'Est. 2027' },
          ].map((ipo, i, arr) => (
            <div key={ipo.name} className={`p-5 flex justify-between items-center ${i < arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div>
                <h3 className="font-bold text-slate-800">{ipo.name}</h3>
                <p className="text-xs text-slate-500">{ipo.sector}</p>
              </div>
              <span className="text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">{ipo.est}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

