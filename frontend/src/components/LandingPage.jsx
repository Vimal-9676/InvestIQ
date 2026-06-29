import { useState } from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';
import Footer from './landing/Footer';
import AuthModal from './AuthModal';

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onGetStarted={() => setIsAuthModalOpen(true)} />
      <Hero onGetStarted={() => setIsAuthModalOpen(true)} />
      <Features onGetStarted={() => setIsAuthModalOpen(true)} />
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
