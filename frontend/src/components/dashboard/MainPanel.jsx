import { Search, Bell, Plus, TrendingUp, Sparkles } from 'lucide-react';

const MainPanel = () => {
  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      {/* Top bar */}
      <header className="flex items-center justify-between mb-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tickers, companies, or reports..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">NVDA Analytics</h1>
          <p className="text-sm text-slate-500">NVIDIA Corporation · Tech Sector</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Watchlist</span>
        </button>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-end space-x-4 mb-2">
              <h2 className="text-5xl font-bold text-slate-900 tracking-tight">$822.79</h2>
              <div className="flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md mb-1.5">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.45%
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
        <div className="w-full h-64 bg-green-50/30 rounded-xl relative overflow-hidden mb-6 flex items-end">
           {/* Mock Chart Line */}
           <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full stroke-green-500 fill-none" strokeWidth="1.5">
              <path d="M0,35 L10,33 L20,38 L30,25 L40,28 L50,15 L60,20 L70,10 L80,12 L90,2 L100,0" />
           </svg>
        </div>

        {/* AI Growth Analysis Box */}
        <div className="bg-indigo-50/60 rounded-xl p-4 flex items-start space-x-4 border border-indigo-100/50">
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1">AI Growth Analysis</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              NVDA shows strong upward momentum driven by data center demand. Algorithmic sentiment analysis indicates 84% positive institutional sentiment over the last 72 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <h3 className="text-lg font-bold text-slate-900 mb-4">Key Metrics</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">Market Cap</p>
          <p className="text-2xl font-bold text-slate-900">2.06T</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">P/E Ratio</p>
          <p className="text-2xl font-bold text-slate-900">73.54</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">EPS (TTM)</p>
          <p className="text-2xl font-bold text-slate-900">11.93</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2">52W Range</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm font-medium">258</span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-indigo-800 rounded-full ml-auto"></div>
            </div>
            <span className="text-sm font-medium">974</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPanel;
