import { useState, createContext, useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';
import ChatWidget from './dashboard/ChatWidget';
import { useAuth } from '../context/AuthContext';
import { Home, List, Upload, Clock, User } from 'lucide-react';

// Create a context so pages can open the chat widget
const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

const Dashboard = () => {
  const { logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatInitialMessage, setChatInitialMessage] = useState('');

  const openChatWithContext = (message) => {
    setIsChatOpen(true);
    if (message) {
      setChatInitialMessage(message);
    }
  };

  const mobileNavClass = ({ isActive }) =>
    `flex flex-col items-center justify-center w-full py-2 ${
      isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
    }`;

  return (
    <DashboardContext.Provider value={{ isChatOpen, setIsChatOpen, openChatWithContext, chatInitialMessage, setChatInitialMessage }}>
      <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full">
          <Sidebar onSignOut={logout} />
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden pb-16 md:pb-0">
          <Outlet />
        </div>
        
        <ChatWidget />

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-around z-30 pb-safe">
          <NavLink to="/dashboard/home" className={mobileNavClass}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Home</span>
          </NavLink>
          <NavLink to="/dashboard/watchlist" className={mobileNavClass}>
            <List className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Watchlist</span>
          </NavLink>
          <NavLink to="/dashboard/portfolio" className={mobileNavClass}>
            <Upload className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Portfolio</span>
          </NavLink>
          <NavLink to="/dashboard/history" className={mobileNavClass}>
            <Clock className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">History</span>
          </NavLink>
          <NavLink to="/dashboard/profile" className={mobileNavClass}>
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Profile</span>
          </NavLink>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default Dashboard;
