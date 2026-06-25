import { Activity, Sparkles, FileText, BarChart2, Scale } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
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

      {/* Hero Section */}
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
          <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium px-8 py-3 rounded-lg transition-all duration-300">
            View Demo
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

      {/* Features Section */}
      <section className="bg-slate-100 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Institutional Grade Analysis</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Built for precision, designed for speed. Our AI platform processes millions of data points to deliver actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">True RAG (PDF Analysis)</h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                Upload SEC filings, earnings transcripts, or equity research. Our Retrieval-Augmented Generation extracts precise metrics with cited sources, eliminating hallucinations.
              </p>
              <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between text-indigo-600 text-sm font-semibold hover:text-indigo-800 cursor-pointer transition-colors">
                Upload Document
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live News Sentiment</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Real-time NLP analysis of Bloomberg, Reuters, and financial Twitter. Instantly gauge market sentiment shifts before they hit the tape.
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full mb-2 overflow-hidden flex">
                <div className="bg-green-400 w-[65%] h-full"></div>
                <div className="bg-slate-200 w-[15%] h-full"></div>
                <div className="bg-red-200 w-[20%] h-full"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-6">
                <span>BULLISH 65%</span>
                <span>BEARISH 20%</span>
              </div>
              <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between text-indigo-600 text-sm font-semibold hover:text-indigo-800 cursor-pointer transition-colors">
                View Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-6">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bull vs Bear Analytics</h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                Objective synthesis of opposing analyst viewpoints. Our AI models build distinct bull and bear cases, highlighting key diverging assumptions in DCF models.
              </p>
              <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between text-indigo-600 text-sm font-semibold hover:text-indigo-800 cursor-pointer transition-colors">
                Compare Theses
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default LandingPage;
