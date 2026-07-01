import { FileText, Upload as UploadIcon, Loader2, Lightbulb, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const Section = ({ icon: Icon, title, items, color, bgColor }) => (
  <div className={`rounded-2xl border p-5 ${bgColor}`}>
    <h3 className={`text-base font-bold mb-3 flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" /> {title}
    </h3>
    <ul className="space-y-2">
      {items?.map((item, i) => (
        <li key={i} className="flex items-start text-sm text-slate-700">
          <ChevronRight className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0 text-slate-400" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const EarningsAnalyzerView = () => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const formData = new FormData();
    formData.append('document', file);

    setIsUploading(true);
    setAnalysis(null);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API}/api/ai/analyze-earnings`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        timeout: 120000 // 2 min timeout for large PDFs
      });
      if (res.data.success) {
        setAnalysis(res.data.analysis);
      } else {
        setError(res.data.message || 'Analysis failed. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to analyze document.';
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 overflow-y-auto w-full max-w-full min-w-0 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center mb-2">
          <FileText className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Earnings Call Analyzer</h1>
            <p className="text-sm text-slate-500">Upload any PDF — earnings transcript, annual report, research note</p>
          </div>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-indigo-200 p-8 text-center mb-6 hover:border-indigo-400 transition-colors mt-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            {isUploading
              ? <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              : <UploadIcon className="w-8 h-8 text-indigo-500" />
            }
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            {isUploading ? `Analyzing "${fileName}"...` : 'Upload Earnings PDF'}
          </h2>
          <p className="text-slate-500 text-sm mb-5 max-w-sm mx-auto">
            {isUploading
              ? 'Gemini AI is reading and analyzing your document. This may take 20–40 seconds.'
              : 'Drop a PDF transcript of a company\'s earnings call, annual report, or financial document. AI will extract key insights instantly.'}
          </p>
          <button
            onClick={handleUploadClick}
            disabled={isUploading}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isUploading
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              : <><UploadIcon className="w-4 h-4 mr-2" /> Select PDF File</>
            }
          </button>
          <p className="text-xs text-slate-400 mt-3">Supports text-based PDFs up to ~10 MB</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700 text-sm">Analysis Failed</p>
              <p className="text-red-600 text-sm mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Result */}
        {analysis && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Analysis Results</h2>
              <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full">✓ Complete</span>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-indigo-900 mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" /> AI Summary
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">{analysis.summary}</p>
            </div>

            {/* 3 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Section
                icon={Lightbulb}
                title="Key Insights"
                items={analysis.insights}
                color="text-indigo-700"
                bgColor="bg-indigo-50 border-indigo-100"
              />
              <Section
                icon={TrendingUp}
                title="Opportunities"
                items={analysis.opportunities}
                color="text-emerald-700"
                bgColor="bg-emerald-50 border-emerald-100"
              />
              <Section
                icon={AlertTriangle}
                title="Risks"
                items={analysis.risks}
                color="text-red-700"
                bgColor="bg-red-50 border-red-100"
              />
            </div>

            {/* Re-analyze CTA */}
            <div className="text-center pt-2">
              <button
                onClick={handleUploadClick}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2"
              >
                Analyze another document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
