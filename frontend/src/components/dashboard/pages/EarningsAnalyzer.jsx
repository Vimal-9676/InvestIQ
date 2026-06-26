import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Lightbulb, Activity, ChevronRight, RefreshCw } from 'lucide-react';
import TopBar from '../TopBar';
import { api } from '../../../services/api';

const EarningsAnalyzer = () => {
  const [step, setStep] = useState('upload'); // 'upload', 'loading', 'results'
  const [dragActive, setDragActive] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startAnalysis(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysis(e.target.files[0]);
    }
  };

  const startAnalysis = async (file) => {
    if (!file) return;
    setStep('loading');
    setError(null);
    try {
      const data = await api.rag.uploadDocument(file);
      setResultData(data);
      setStep('results');
    } catch (err) {
      setError("Failed to analyze the document. Please try again.");
      setStep('upload');
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
      <TopBar placeholder="Search AI tools..." />
      
      <header className="mb-8 mt-2">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Earnings Call Analyzer</h1>
        <p className="text-slate-500">Extract insights, risks, and forward-looking statements from PDF transcripts instantly.</p>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
          {error}
        </div>
      )}

      {step === 'upload' && (
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white p-12 transition-all hover:border-indigo-400 hover:bg-indigo-50/50"
             onDragEnter={handleDrag}
             onDragLeave={handleDrag}
             onDragOver={handleDrag}
             onDrop={handleDrop}>
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Upload Transcript (PDF)</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8">Drag and drop your SEC 10-K, 10-Q, or earnings call transcript here, or click to browse.</p>
          <label className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg shadow-sm transition-all cursor-pointer">
            Select PDF File
            <input type="file" className="hidden" accept=".pdf" onChange={handleFileInput} />
          </label>
        </div>
      )}

      {step === 'loading' && (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm p-12">
          <RefreshCw className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Transcript</h3>
          <p className="text-slate-500 text-center max-w-sm">Our AI is extracting entities, sentiment, and forward-looking guidance...</p>
          <div className="w-64 h-2 bg-slate-100 rounded-full mt-8 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full animate-pulse w-2/3"></div>
          </div>
        </div>
      )}

      {step === 'results' && resultData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-indigo-600 mr-3" />
              <div>
                <h4 className="font-bold text-indigo-900">{resultData.filename}</h4>
                <p className="text-xs text-indigo-600">Processed in 2.4 seconds • {resultData.pages} pages</p>
              </div>
            </div>
            <button onClick={() => { setStep('upload'); setResultData(null); }} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-4 py-2 bg-white rounded-lg border border-indigo-200 transition-colors">
              Analyze Another
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">AI Summary</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {resultData.summary}
              </p>
              <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md w-fit">
                Overall Sentiment: {resultData.sentiment}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Key Insights</h3>
              </div>
              <ul className="space-y-3">
                {resultData.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mr-3">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Potential Risks</h3>
              </div>
              <ul className="space-y-3">
                {resultData.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Opportunities</h3>
              </div>
              <ul className="space-y-3">
                {resultData.opportunities.map((opp, idx) => (
                  <li key={idx} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EarningsAnalyzer;
