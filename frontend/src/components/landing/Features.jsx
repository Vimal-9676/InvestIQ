import { FileText, BarChart2, Scale } from 'lucide-react';

const Features = () => {
  return (
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
  );
};

export default Features;
