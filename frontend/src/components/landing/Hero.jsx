import { Sparkles } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <main className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-16">
      <div className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-8">
        <Sparkles className="w-3 h-3 mr-1.5" />
        INVESTIQ AI V2.0
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mb-6">
        GenAI-Powered Financial Intelligence.
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        Stop reading 100-page annual reports. Ask InvestIQ and get instant, verified stock insights with data-backed sources.
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={onGetStarted}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm"
        >
          Start Free Research
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Trusted By */}
      <div className="mt-20 text-center w-full max-w-4xl opacity-60">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">TRUSTED BY ANALYSTS AT</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale">
          <span className="text-xl font-bold text-slate-600">BLACKROCK</span>
          <span className="text-2xl font-serif italic text-slate-600">Goldman Sachs</span>
          <span className="text-xl font-medium text-slate-600 tracking-tight">Morgan Stanley</span>
          <span className="text-xl font-bold text-slate-600">Vanguard</span>
        </div>
      </div>
    </main>
  );
};

export default Hero;
