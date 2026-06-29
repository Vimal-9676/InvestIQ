import Sidebar from './dashboard/Sidebar';
import MainPanel from './dashboard/MainPanel';
import ChatWidget from './dashboard/ChatWidget';
import { ProfileView, UpgradeView, HelpView } from './dashboard/views/MockViews';
import { HomeView } from './dashboard/views/HomeView';
import { WatchlistView } from './dashboard/views/WatchlistView';
import { EarningsAnalyzerView } from './dashboard/views/EarningsAnalyzerView';
import { BullBearView } from './dashboard/views/BullBearView';
import { NewsView } from './dashboard/views/NewsView';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { fetchExchangeRate } from '../utils/currency';
import { Menu, Bot } from 'lucide-react';

const Dashboard = () => {
  const { logout } = useAuth();
  const [currentSymbol, setCurrentSymbol] = useState('RELIANCE.NS');
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Fetch live USD→INR rate once on mount
  useEffect(() => { fetchExchangeRate(); }, []);

  const handleSearch = (symbol) => {
    setCurrentSymbol(symbol);
    setActiveTab('stock-details');
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':         return <HomeView onSearch={handleSearch} />;
      case 'watchlist':    return <WatchlistView onSearch={handleSearch} />;
      case 'analyzer':     return <EarningsAnalyzerView />;
      case 'bullbear':     return <BullBearView />;
      case 'news':         return <NewsView />;
      case 'profile':      return <ProfileView />;
      case 'upgrade':      return <UpgradeView />;
      case 'help':         return <HelpView />;
      case 'stock-details':
      default:
        return (
          <MainPanel
            currentSymbol={currentSymbol}
            setCurrentSymbol={setCurrentSymbol}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            toggleChat={() => setChatOpen(!chatOpen)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        onSignOut={logout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Dim overlay for mobile when sidebar/chat is open */}
      {(sidebarOpen || chatOpen) && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] z-30 lg:hidden"
          onClick={() => { setSidebarOpen(false); setChatOpen(false); }}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shadow-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
              I
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">InvestIQ</span>
          </div>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Bot className="w-5 h-5" />
          </button>
        </div>

        {/* Page content */}
        <div className="flex-1 flex overflow-hidden">
          {renderContent()}
          <ChatWidget
            currentSymbol={currentSymbol}
            isOpen={chatOpen}
            setIsOpen={setChatOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
