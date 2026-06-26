import React, { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ShieldAlert, Sparkles, Scale, AlertCircle } from 'lucide-react';
import TopBar from '../TopBar';
import { api } from '../../../services/api';

const BullBearAnalyzer = () => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    setResultData(null);
    setError(null);
    
    try {
      const data = await api.analysis.getBullBear(query);
      setResultData(data);
    } catch (err) {
      setError("Failed to generate analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search AI tools..." />
      
      <header className="mb-8 mt-2">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bull vs Bear Analyzer</h1>
        <p className="text-slate-500">Ask any investment question and get an objective synthesis of opposing analyst viewpoints.</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Should I invest in TCS?"
            className="w-full pl-12 pr-32 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <button 
            type="submit" 
            disabled={isAnalyzing || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg transition-colors flex items-center"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </form>
      </div>

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-20 opacity-70">
          <Scale className="w-16 h-16 text-indigo-400 animate-pulse mb-6" />
          <p className="text-slate-600 font-medium animate-pulse text-lg">Synthesizing institutional research...</p>
        </div>
      )}

      {resultData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="flex items-center text-xs text-amber-600 bg-amber-50 border border-amber-200 px-4 py-3 rounded-lg">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="font-semibold mr-1">Disclaimer:</span> 
            This is an AI-generated analysis of market sentiment, not direct financial advice. Always consult a certified financial planner.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bull Case */}
            <div className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-32 h-32 text-emerald-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900">The Bull Case</h3>
                </div>
                <div className="space-y-4">
                  {resultData.bullCase.map((point, idx) => (
                    <p key={idx} className="text-slate-700 leading-relaxed">
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Bear Case */}
            <div className="bg-gradient-to-b from-rose-50 to-white rounded-2xl border border-rose-100 p-6 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown className="w-32 h-32 text-rose-600" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mr-4">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-rose-900">The Bear Case</h3>
                </div>
                <div className="space-y-4">
                  {resultData.bearCase.map((point, idx) => (
                    <p key={idx} className="text-slate-700 leading-relaxed">
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Risks Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mr-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Key Execution Risks</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {resultData.risks.map((risk, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <h4 className="font-semibold text-slate-800 mb-2">{risk.title}</h4>
                  <p className="text-sm text-slate-600">{risk.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
};

export default BullBearAnalyzer;
