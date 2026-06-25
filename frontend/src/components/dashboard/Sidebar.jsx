import { Home, List, Upload, Clock, User } from 'lucide-react';

const Sidebar = ({ onSignOut }) => {
  return (
    <aside className="w-64 bg-[#F8FAFC] border-r border-slate-200 flex flex-col pt-6 pb-6 h-full flex-shrink-0">
      <div className="px-6 mb-10">
        <div className="flex items-center text-primary-dark font-bold text-xl mb-1">
          <span className="text-indigo-900">InvestIQ</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <a href="#" className="flex items-center px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-sm transition-all">
          <Home className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Home</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
          <List className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Watchlist</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
          <Upload className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Uploads</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
          <Clock className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">History</span>
        </a>
        <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
          <User className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Profile</span>
        </a>
      </nav>

      <div className="px-4 mt-auto space-y-2">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-xl transition-colors">
          Upgrade to Alpha
        </button>
        <button className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-slate-800 text-sm transition-colors">
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
