import Sidebar from './dashboard/Sidebar';
import MainPanel from './dashboard/MainPanel';
import ChatWidget from './dashboard/ChatWidget';

const Dashboard = ({ onSignOut }) => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      <Sidebar onSignOut={onSignOut} />
      <MainPanel />
      <ChatWidget />
    </div>
  );
};

export default Dashboard;
