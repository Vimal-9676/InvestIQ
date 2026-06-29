import { Star, Clock, User, Shield, HelpCircle, Phone, Mail, MessageCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const WatchlistView = () => (
  <div className="flex-1 p-8 overflow-y-auto">
    <div className="flex items-center mb-6">
      <Star className="w-8 h-8 text-indigo-600 mr-3" />
      <h1 className="text-3xl font-bold text-slate-900">Watchlist</h1>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <p className="text-slate-500 mb-6">Your curated list of stocks to monitor.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['AAPL', 'TSLA', 'MSFT', 'AMZN', 'GOOGL', 'META'].map((ticker) => (
          <div key={ticker} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer flex justify-between items-center">
            <span className="font-bold text-slate-800">{ticker}</span>
            <span className="text-sm font-medium text-emerald-500">Live</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const HistoryView = () => (
  <div className="flex-1 p-8 overflow-y-auto">
    <div className="flex items-center mb-6">
      <Clock className="w-8 h-8 text-indigo-600 mr-3" />
      <h1 className="text-3xl font-bold text-slate-900">Activity History</h1>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <p className="text-slate-500 mb-6">Your recent interactions and analyzed stocks.</p>
      <div className="space-y-4">
        {[
          { action: 'Analyzed NVDA Earnings', date: 'Today, 10:45 AM' },
          { action: 'Uploaded TSLA_Q3_Report.pdf', date: 'Yesterday, 2:30 PM' },
          { action: 'Searched for AAPL', date: 'Oct 15, 9:15 AM' },
        ].map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-700 font-medium">{item.action}</span>
            <span className="text-slate-400 text-sm">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ProfileView = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your account and preferences</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Cover Photo Area */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 relative"></div>
          
          <div className="px-8 pb-8 pt-6">
            <div className="flex items-center mb-8">
              {/* Avatar */}
              <div className="w-20 h-20 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 mr-6">
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-black text-white">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name || 'User'}</h2>
                <div className="inline-flex items-center mt-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wide uppercase">
                  <Shield className="w-3.5 h-3.5 mr-1" /> Pro Member
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" disabled value={user?.email || ''} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 font-medium focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Risk Tolerance</label>
                  <select className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow">
                    <option>Moderate</option>
                    <option>Aggressive</option>
                    <option>Conservative</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const UpgradeView = () => (
  <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-center">
    <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-6">
      <Shield className="w-10 h-10" />
    </div>
    <h1 className="text-4xl font-bold text-slate-900 mb-4">Upgrade to Alpha</h1>
    <p className="text-slate-500 text-center max-w-lg mb-8 text-lg">
      Unlock unlimited document uploads, real-time advanced alerts, and priority AI generation.
    </p>
    <div className="flex space-x-4">
      <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
        Get Alpha - ₹1,499/mo
      </button>
    </div>
  </div>
);

export const HelpView = () => (
  <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[#F8FAFC]">
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Help &amp; Support</h1>
          <p className="text-sm text-slate-500">We're here to help you, 9 AM – 9 PM IST</p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a href="tel:18001234567" className="group bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Toll-Free</p>
            <p className="font-bold text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">1800-123-4567</p>
            <p className="text-xs text-slate-400">Mon – Sat · 9 AM – 9 PM IST</p>
          </div>
        </a>

        <a href="mailto:support@investiq.in" className="group bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Support</p>
            <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">support@investiq.in</p>
            <p className="text-xs text-slate-400">Reply within 24 hours</p>
          </div>
        </a>
      </div>

      {/* FAQ */}
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <MessageCircle className="w-5 h-5 text-indigo-500 mr-2" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 mb-8">
        {[
          {
            q: 'How do I analyze an earnings PDF?',
            a: 'Go to the Earnings Analyzer tab in the sidebar, click "Select PDF File", and upload any earnings transcript or annual report. Gemini AI will extract a summary, insights, opportunities and risks within seconds.'
          },
          {
            q: 'Is the market data real-time?',
            a: 'Yes! We use Yahoo Finance APIs to fetch live market data. Nifty 50, Sensex, and all stock prices are refreshed every time you load the page. You can also click Refresh on the Home tab.'
          },
          {
            q: 'Can the AI make trades for me?',
            a: 'No. InvestIQ is strictly an analysis and research tool. It will never execute trades, provide direct buy/sell advice, or connect to your broker account.'
          },
          {
            q: 'How do I add a stock to my watchlist?',
            a: 'Search for any stock using the search bar or the Home tab. When viewing a stock, click the star (☆) icon near the ticker name. It will appear in your Watchlist tab.'
          },
          {
            q: 'Which stock exchanges are supported?',
            a: 'We support NSE and BSE (Indian exchanges) as well as US exchanges like NYSE and NASDAQ. For Indian stocks, use the .NS suffix (e.g., RELIANCE.NS) or search by company name.'
          },
        ].map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-indigo-200 transition-colors">
            <div className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-800 mb-1.5">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 text-center">
        <p className="text-white font-bold text-lg mb-1">Still have questions?</p>
        <p className="text-indigo-200 text-sm mb-4">Our support team typically responds within a few hours.</p>
        <a
          href="mailto:support@investiq.in"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-50 transition-colors"
        >
          <Mail className="w-4 h-4" /> Email Us
        </a>
      </div>

    </div>
  </div>
);
