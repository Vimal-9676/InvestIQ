import { TrendingUp, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export const BullBearView = () => {
  const [ticker, setTicker] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ai/bull-bear`, { ticker: ticker.trim().toUpperCase() });
      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error(error);
      alert('Failed to generate analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-slate-900">Bull vs Bear Analysis</h1>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="e.g. Should I invest in TCS?" 
              className="flex-1 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[140px]"
            >
              {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Analyze</>}
            </button>
          </form>
        </div>

        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">Bull Case</h3>
              <p className="text-emerald-900 leading-relaxed whitespace-pre-wrap">{analysis.bull}</p>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">Bear Case</h3>
              <p className="text-red-900 leading-relaxed whitespace-pre-wrap">{analysis.bear}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 lg:col-span-2">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">Risks & Considerations</h3>
              <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">{analysis.risks}</p>
              <p className="text-xs text-amber-700 mt-4 italic font-medium">* No direct financial advice is provided. This analysis is based on available market data.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
