import { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Stocks', sub: [
      { title: 'Intraday', desc: 'Monitor top intraday performers in real time' },
      { title: 'Stock Screener', desc: 'Filter based on P/E, EPS, sector and more' },
      { title: 'IPO', desc: 'Track upcoming and ongoing IPOs' },
      { title: 'Stock Events', desc: 'Dividends, bonus, buybacks and more' },
    ]
  },
  {
    label: 'AI Tools', sub: [
      { title: 'Earnings Analyzer', desc: 'Upload any PDF for instant AI breakdown' },
      { title: 'Bull vs Bear', desc: 'AI-powered balanced investment thesis' },
      { title: 'AI Chat', desc: 'Ask anything about any stock or market' },
    ]
  },
  {
    label: 'Market', sub: [
      { title: 'Indices', desc: 'Track Nifty, Sensex, global markets live' },
      { title: 'Top Gainers', desc: 'Best performing stocks today' },
      { title: 'Market News', desc: 'Live news updates from stock market' },
    ]
  },
];

const Navbar = ({ onGetStarted }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">I</div>
            <span className="text-xl font-black text-slate-900 tracking-tight">InvestIQ</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setActiveMenu(item.label)} onMouseLeave={() => setActiveMenu(null)}>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-700 rounded-lg hover:bg-indigo-50 transition-all">
                  {item.label} <ChevronDown className="w-3.5 h-3.5 ml-1" />
                </button>
                {activeMenu === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
                    {item.sub.map((s) => (
                      <div key={s.title} className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-400">
              <Search className="w-4 h-4 mr-2" /> Search stocks…
            </div>
            <button
              onClick={onGetStarted}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow-indigo-200 hover:shadow-md"
            >
              Login / Sign up
            </button>
            <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">{item.label}</p>
              {item.sub.map((s) => (
                <button key={s.title} className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                  {s.title}
                </button>
              ))}
            </div>
          ))}
          <button onClick={onGetStarted} className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
