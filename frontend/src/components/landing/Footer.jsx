const Footer = () => (
  <footer className="bg-slate-900 text-slate-400">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">I</div>
            <span className="text-xl font-black text-white">InvestIQ</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            AI-powered stock intelligence platform for Indian investors. Real-time Nifty, Sensex, and global market data.
          </p>
          <p className="text-xs text-slate-600">© 2026 InvestIQ. All rights reserved.</p>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Products</h4>
          <ul className="space-y-2 text-sm">
            {['Live Market', 'AI Stock Chat', 'Earnings Analyzer', 'Bull vs Bear', 'Watchlist', 'Market News'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Markets */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Markets</h4>
          <ul className="space-y-2 text-sm">
            {['Nifty 50', 'BSE Sensex', 'Nifty Bank', 'S&P 500', 'Top Gainers', 'Top Losers', 'IPOs'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            {['About Us', 'Blog', 'Careers', 'Help & Support', 'Privacy Policy', 'Terms of Use'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-slate-800 pt-8">
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
          <strong className="text-slate-500">Disclaimer:</strong> InvestIQ is for informational purposes only and does not provide financial, investment, or trading advice. 
          All market data is sourced from publicly available APIs. Past performance is not indicative of future results. 
          Please consult a SEBI-registered financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
