import { Activity } from 'lucide-react';

const Navbar = ({ onGetStarted }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
      <div className="flex items-center text-primary-dark font-bold text-xl">
        <Activity className="w-6 h-6 mr-2 text-indigo-700" />
        <span className="text-indigo-900">InvestIQ</span>
      </div>
      
      <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
        <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Features</a>
        <a href="#" className="hover:text-indigo-600 transition-colors pb-1">Pricing</a>
        <a href="#" className="hover:text-indigo-600 transition-colors pb-1">About</a>
      </div>
      
      <div className="flex items-center space-x-6">
        <button onClick={onGetStarted} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
          Login
        </button>
        <button 
          onClick={onGetStarted}
          className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
