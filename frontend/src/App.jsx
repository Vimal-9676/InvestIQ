import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Dashboard Pages
import Home from './components/dashboard/pages/Home';
import Watchlist from './components/dashboard/pages/Watchlist';
import Portfolio from './components/dashboard/pages/Portfolio';
import History from './components/dashboard/pages/History';
import Profile from './components/dashboard/pages/Profile';
import StockDetail from './components/dashboard/StockDetail';
import EarningsAnalyzer from './components/dashboard/pages/EarningsAnalyzer';
import BullBearAnalyzer from './components/dashboard/pages/BullBearAnalyzer';
import AiWatchlist from './components/dashboard/pages/AiWatchlist';

// Landing pages
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Terms from './components/pages/Terms';
import HelpCenter from './components/pages/HelpCenter';

function App() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/help-center" element={<HelpCenter />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="stock/:ticker" element={<StockDetail />} />
          
          {/* AI Analytics Routes */}
          <Route path="earnings-analyzer" element={<EarningsAnalyzer />} />
          <Route path="bull-bear" element={<BullBearAnalyzer />} />
          <Route path="ai-watchlist" element={<AiWatchlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
