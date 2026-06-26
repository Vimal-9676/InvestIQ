import { Home, List, Upload, Clock, User, HelpCircle, FileText, Scale, Eye } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = ({ onSignOut }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-xl transition-all ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside className="w-64 bg-[#F8FAFC] border-r border-slate-200 flex flex-col pt-6 pb-6 h-full flex-shrink-0">
      <div className="px-6 mb-10">
        <Link to="/dashboard/home" className="flex items-center text-primary-dark font-bold text-xl mb-1">
          <span className="text-indigo-900">InvestIQ</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        
        <div>
          <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</div>
          <div className="space-y-1">
            <NavLink to="/dashboard/home" className={linkClass}>
              <Home className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Home</span>
            </NavLink>
            <NavLink to="/dashboard/watchlist" className={linkClass}>
              <List className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Watchlist</span>
            </NavLink>
            <NavLink to="/dashboard/portfolio" className={linkClass}>
              <Upload className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Portfolio</span>
            </NavLink>
            <NavLink to="/dashboard/history" className={linkClass}>
              <Clock className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">History</span>
            </NavLink>
            <NavLink to="/dashboard/profile" className={linkClass}>
              <User className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Profile</span>
            </NavLink>
          </div>
        </div>

        <div>
          <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Analytics</div>
          <div className="space-y-1">
            <NavLink to="/dashboard/earnings-analyzer" className={linkClass}>
              <FileText className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium text-sm">Earnings Analyzer</span>
            </NavLink>
            <NavLink to="/dashboard/bull-bear" className={linkClass}>
              <Scale className="w-5 h-5 mr-3 text-emerald-500" />
              <span className="font-medium text-sm">Bull vs Bear</span>
            </NavLink>
            <NavLink to="/dashboard/ai-watchlist" className={linkClass}>
              <Eye className="w-5 h-5 mr-3 text-blue-500" />
              <span className="font-medium text-sm">AI Watchlist</span>
            </NavLink>
          </div>
        </div>

      </nav>

      <div className="p-4 border-t border-slate-200 space-y-1">
        <Link to="/help-center" target="_blank" rel="noopener noreferrer" className="w-full flex items-center px-4 py-3 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
          <HelpCircle className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Help</span>
        </Link>
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
