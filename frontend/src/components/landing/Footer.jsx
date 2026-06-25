const Footer = () => {
  return (
    <footer className="bg-white py-8 px-8 border-t border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <div className="flex items-center text-indigo-900 font-bold text-lg justify-center md:justify-start mb-2">
            InvestIQ
          </div>
          <p className="text-xs text-slate-500">© 2024 InvestIQ AI. All rights reserved. Precise Financial Intelligence.</p>
        </div>
        <div className="flex space-x-6 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Security</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Status</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
