import { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'dashboard'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthModalOpen(false);
    setView('dashboard');
  };

  return (
    <div className="w-full min-h-screen">
      {view === 'landing' ? (
        <LandingPage onGetStarted={() => setIsAuthModalOpen(true)} />
      ) : (
        <Dashboard onSignOut={() => setView('landing')} />
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
