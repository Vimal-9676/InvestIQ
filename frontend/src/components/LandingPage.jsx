import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';
import Footer from './landing/Footer';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onGetStarted={onGetStarted} />
      <Hero onGetStarted={onGetStarted} />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
