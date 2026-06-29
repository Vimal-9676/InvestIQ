import { Home, List, FileText, TrendingUp, Newspaper, User, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ onSignOut, activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const getTabClass = (tabId) => {
    return activeTab === tabId
      ? "w-full flex items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl shadow-md shadow-indigo-200 transition-all font-semibold"
      : "w-full flex items-center px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all font-medium";
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Close sidebar on mobile after clicking
  };

  return (
    <aside className={`absolute lg:relative z-40 bg-[#F8FAFC] border-r border-slate-200 flex flex-col pt-6 pb-6 h-full flex-shrink-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64`}>
      <div className="px-6 mb-10 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleTabClick('home')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
            I
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">InvestIQ</span>
        </div>
        <button className="lg:hidden p-2 text-slate-500 hover:text-slate-800" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <button onClick={() => handleTabClick('home')} className={getTabClass('home')}>
          <Home className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Home</span>
        </button>
        <button onClick={() => handleTabClick('watchlist')} className={getTabClass('watchlist')}>
          <List className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Watchlist</span>
        </button>
        <button onClick={() => handleTabClick('analyzer')} className={getTabClass('analyzer')}>
          <FileText className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Earnings Analyzer</span>
        </button>
        <button onClick={() => handleTabClick('bullbear')} className={getTabClass('bullbear')}>
          <TrendingUp className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Bull vs Bear</span>
        </button>
        <button onClick={() => handleTabClick('news')} className={getTabClass('news')}>
          <Newspaper className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">News</span>
        </button>
        <button onClick={() => handleTabClick('profile')} className={getTabClass('profile')}>
          <User className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Profile</span>
        </button>
      </nav>

      <div className="px-4 mt-auto space-y-2">
        <button onClick={() => setActiveTab('upgrade')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-xl transition-colors">
          Upgrade to Alpha
        </button>
        <button onClick={() => setActiveTab('help')} className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-slate-800 text-sm transition-colors">
          <span className="mr-2">?</span> Help
        </button>
        <button onClick={onSignOut} className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-slate-800 text-sm transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
