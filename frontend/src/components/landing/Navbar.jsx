import { Activity } from 'lucide-react';

const Navbar = ({ onGetStarted }) => {
  return (
    <nav className="flex items-center px-4 py-3 bg-white sticky top-0 z-40 border-b border-slate-100 shadow-sm">
      <div className="flex items-center text-primary-dark font-bold text-xl mr-8">
        <Activity className="w-8 h-8 mr-2 text-indigo-600" />
        <span className="text-slate-900 tracking-tight text-2xl">InvestIQ</span>
      </div>
      
      <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
        
        {/* Stocks Dropdown */}
        <div className="relative group">
          <button className="flex items-center hover:text-indigo-600 transition-colors py-2">
            Stocks
          </button>
          
          <div className="absolute top-full left-0 mt-0 w-[800px] bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 gap-6 p-6">
            <div className="col-span-1 pr-6 border-r border-slate-100">
              <div className="w-full h-32 bg-indigo-50 rounded-lg mb-4 flex items-center justify-center">
                 <Activity className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center">Invest in Stocks <span className="ml-1">→</span></h3>
              <p className="text-xs text-slate-500 leading-relaxed">Invest in stocks, ETFs, IPOs with fast orders. Track returns on your stock holdings and view real-time P&L on your positions.</p>
            </div>
            <div className="col-span-1">
              <a href="#intraday" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Intraday</span>
                <span className="text-xs text-slate-500">Monitor top intraday performers in real time</span>
              </a>
              <a href="#etf" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">ETF Screener</span>
                <span className="text-xs text-slate-500">Get the best of Mutual Funds and flexibility of Stocks</span>
              </a>
              <a href="#ipo" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">IPO</span>
                <span className="text-xs text-slate-500">Track upcoming and ongoing IPOs</span>
              </a>
              <a href="#mtf" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">MTFs</span>
                <span className="text-xs text-slate-500">Buy now, pay later</span>
              </a>
            </div>
            <div className="col-span-1">
              <a href="#stockscreener" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Stock Screener</span>
                <span className="text-xs text-slate-500">Filter based on RSI, PE ratio and more</span>
              </a>
              <a href="#events" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Stock Events</span>
                <span className="text-xs text-slate-500">Dividends, bonus, buybacks and more</span>
              </a>
              <a href="#demat" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Demat Account</span>
                <span className="text-xs text-slate-500">Begin your stock market journey</span>
              </a>
              <a href="#market" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Share Market Today</span>
                <span className="text-xs text-slate-500">Live news updates from stock market</span>
              </a>
            </div>
          </div>
        </div>

        {/* F&O Dropdown */}
        <div className="relative group">
          <button className="flex items-center hover:text-indigo-600 transition-colors py-2">
            F&O
          </button>
          
          <div className="absolute top-full left-0 mt-0 w-[800px] bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 gap-6 p-6">
            <div className="col-span-1 pr-6 border-r border-slate-100">
              <div className="w-full h-32 bg-indigo-50 rounded-lg mb-4 flex items-center justify-center">
                 <Activity className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center">Trade in Futures & Options <span className="ml-1">→</span></h3>
              <p className="text-xs text-slate-500 leading-relaxed">Trade in F&O using the terminal. View charts, indicators, track your orders, P&L and watchlists in a single space.</p>
            </div>
            <div className="col-span-1">
              <a href="#indices" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Indices</span>
                <span className="text-xs text-slate-500">Track markets across the globe</span>
              </a>
              <a href="#terminal" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Terminal</span>
                <span className="text-xs text-slate-500">Track charts, orders, positions, watchlists in one place</span>
              </a>
              <a href="#optionchain" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Option chain</span>
                <span className="text-xs text-slate-500">Analyse chains, view payoffs, create baskets</span>
              </a>
            </div>
            <div className="col-span-1">
              <a href="#pledge" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Pledge</span>
                <span className="text-xs text-slate-500">Get extra balance for trading</span>
              </a>
              <a href="#commodities" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Commodities</span>
                <span className="text-xs text-slate-500">Trade in Crude Oil, Gold, Silver and more</span>
              </a>
              <a href="#api" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">API trading</span>
                <span className="text-xs text-slate-500">Set up and execute trades through our API</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mutual Funds Dropdown */}
        <div className="relative group">
          <button className="flex items-center hover:text-indigo-600 transition-colors py-2">
            Mutual Funds
          </button>
          
          <div className="absolute top-full left-0 mt-0 w-[800px] bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 gap-6 p-6">
            <div className="col-span-1 pr-6 border-r border-slate-100">
              <div className="w-full h-32 bg-indigo-50 rounded-lg mb-4 flex items-center justify-center">
                 <Activity className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center">Invest in Mutual Funds <span className="ml-1">→</span></h3>
              <p className="text-xs text-slate-500 leading-relaxed">Invest in direct mutual funds at zero charges via lump sump investments or SIPs.</p>
            </div>
            <div className="col-span-1">
              <a href="#amcs" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Mutual Fund Houses</span>
                <span className="text-xs text-slate-500">Know about AMCs, funds, fund managers</span>
              </a>
              <a href="#nfos" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">NFO's</span>
                <span className="text-xs text-slate-500">Track all active NFOs in one place</span>
              </a>
              <a href="#growwfunds" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Mutual Funds by InvestIQ</span>
                <span className="text-xs text-slate-500">Mutual funds by InvestIQ designed for your investment goals</span>
              </a>
              <a href="#startsip" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Start SIP</span>
                <span className="text-xs text-slate-500">Build long-term wealth through disciplined monthly investing.</span>
              </a>
            </div>
            <div className="col-span-1">
              <a href="#fundscreener" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Mutual Funds screener</span>
                <span className="text-xs text-slate-500">Filter funds based on risk, fund size and more</span>
              </a>
              <a href="#trackfunds" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Track Funds</span>
                <span className="text-xs text-slate-500">Import funds and track all investments in a single place</span>
              </a>
              <a href="#compare" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Compare Funds</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* More Dropdown */}
        <div className="relative group">
          <button className="flex items-center hover:text-indigo-600 transition-colors py-2">
            More
          </button>
          
          <div className="absolute top-full left-0 mt-0 w-[400px] bg-white border border-slate-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-2 gap-4 p-6">
            <div>
              <a href="#sipcalc" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">SIP calculator</span>
                <span className="text-xs text-slate-500">Estimate returns on a SIP</span>
              </a>
              <a href="#brokerage" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Brokerage calculator</span>
                <span className="text-xs text-slate-500">Estimate charges for your trade/investment</span>
              </a>
              <a href="#margin" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Margin calculator</span>
                <span className="text-xs text-slate-500">Estimate balance needed to buy/sell a stock</span>
              </a>
            </div>
            <div>
              <a href="#swp" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">SWP calculator</span>
                <span className="text-xs text-slate-500">Returns on your systematic withdrawal plan</span>
              </a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block mb-4 hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Pricing</span>
                <span className="text-xs text-slate-500">Brokerage and charges on InvestIQ</span>
              </a>
              <a href="#blog" onClick={(e) => { e.preventDefault(); onGetStarted(); }} className="block hover:bg-slate-50 p-2 rounded -mx-2">
                <span className="block font-semibold text-slate-800">Blog</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex justify-end lg:justify-center px-4 lg:px-12">
        <div className="relative w-full max-w-md hidden md:block">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search InvestIQ..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg shadow-inner focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center space-x-1">
             <span className="px-1.5 py-0.5 border border-slate-200 rounded text-[10px] text-slate-400">⌘</span>
             <span className="px-1.5 py-0.5 border border-slate-200 rounded text-[10px] text-slate-400">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-shrink-0">
        <button 
          onClick={onGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-all duration-300 shadow-sm"
        >
          Login/Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
