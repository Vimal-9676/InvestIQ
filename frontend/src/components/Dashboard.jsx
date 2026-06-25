import Sidebar from './dashboard/Sidebar';
import MainPanel from './dashboard/MainPanel';
import ChatWidget from './dashboard/ChatWidget';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();
  
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      <Sidebar onSignOut={logout} />
      <MainPanel />
      <ChatWidget />
    </div>
  );
};

export default Dashboard;
