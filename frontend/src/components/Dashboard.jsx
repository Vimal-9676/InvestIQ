import { useState } from 'react';
import { 
  Activity, 
  Search, 
  Bell, 
  Plus, 
  TrendingUp, 
  Home, 
  List, 
  Upload, 
  Clock, 
  User,
  Send,
  FileText,
  Sparkles,
  Maximize2
} from 'lucide-react';

const Dashboard = ({ onSignOut }) => {
  const [inputText, setInputText] = useState('');
  
  const [chatHistory] = useState([
    {
      id: 1,
      role: 'user',
      content: 'What are the main growth drivers for NVDA in the next two quarters?'
    },
    {
      id: 2,
      role: 'ai',
      content: "NVIDIA's growth over the next two quarters is expected to be driven primarily by sustained hyperscaler demand for Hopper architecture (H100/H200) and the initial ramp-up of Blackwell GPUs. Additionally, sovereign AI investments and enterprise software revenue (NVIDIA AI Enterprise) are emerging as meaningful secondary drivers.",
      sources: [
        { title: 'Q4 FY24 Earnings Call Transcript, p.4', type: 'doc' }
      ]
    }
  ]);

  const suggestionChips = [
    "Summarize Q4 Results",
    "Key Risks?",
    "Compare Margins"
  ];

  const handleChipClick = (text) => {
    setInputText(text);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#F8FAFC] border-r border-slate-200 flex flex-col pt-6 pb-6 h-full flex-shrink-0">
        <div className="px-6 mb-10">
          <div className="flex items-center text-primary-dark font-bold text-xl mb-1">
            <span className="text-indigo-900">InvestIQ</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {/* User requested labels: Home, Watchlist, Uploads, History, Profile */}
          <a href="#" className="flex items-center px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-sm transition-all">
            <Home className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">Home</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
            <List className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">Watchlist</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
            <Upload className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">Uploads</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
            <Clock className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">History</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all">
            <User className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">Profile</span>
          </a>
        </nav>

        <div className="px-4 mt-auto space-y-2">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-xl transition-colors">
            Upgrade to Alpha
          </button>
          <button className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-slate-800 text-sm transition-colors">
            <span className="mr-2">?</span> Help
          </button>
          <button onClick={onSignOut} className="w-full flex items-center px-4 py-2 text-slate-500 hover:text-slate-800 text-sm transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Center Main Panel */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto px-8 py-6 pb-20">
        
        {/* Top bar */}
        <header className="flex items-center justify-between mb-8">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tickers, companies, or reports..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">NVDA Analytics</h1>
            <p className="text-sm text-slate-500">NVIDIA Corporation · Tech Sector</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Watchlist</span>
          </button>
        </div>

        {/* Main Chart Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-end space-x-4 mb-2">
                <h2 className="text-5xl font-bold text-slate-900 tracking-tight">$822.79</h2>
                <div className="flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-md mb-1.5">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +3.45%
                </div>
              </div>
              <p className="text-xs text-slate-500">Market Open · Updated 2m ago</p>
            </div>
            
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              {['1D', '1W', '1M', 'YTD'].map((tf, i) => (
                <button 
                  key={tf} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${i === 1 ? 'bg-indigo-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Wrapper Container */}
          <div className="w-full h-64 bg-green-50/30 rounded-xl relative overflow-hidden mb-6 flex items-end">
             {/* Mock Chart Line */}
             <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full stroke-green-500 fill-none" strokeWidth="1.5">
                <path d="M0,35 L10,33 L20,38 L30,25 L40,28 L50,15 L60,20 L70,10 L80,12 L90,2 L100,0" />
             </svg>
          </div>

          {/* AI Growth Analysis Box */}
          <div className="bg-indigo-50/60 rounded-xl p-4 flex items-start space-x-4 border border-indigo-100/50">
            <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">AI Growth Analysis</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                NVDA shows strong upward momentum driven by data center demand. Algorithmic sentiment analysis indicates 84% positive institutional sentiment over the last 72 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">Market Cap</p>
            <p className="text-2xl font-bold text-slate-900">2.06T</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">P/E Ratio</p>
            <p className="text-2xl font-bold text-slate-900">73.54</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">EPS (TTM)</p>
            <p className="text-2xl font-bold text-slate-900">11.93</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2">52W Range</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-medium">258</span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-indigo-800 rounded-full ml-auto"></div>
              </div>
              <span className="text-sm font-medium">974</span>
            </div>
          </div>
        </div>

      </main>

      {/* Right Panel: AI Chat Widget */}
      <aside className="w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 flex-shrink-0">
        <header className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center text-indigo-900 font-bold text-lg">
            <Activity className="w-5 h-5 mr-2 text-indigo-600" />
            InvestIQ Assistant
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </header>

        {/* Suggestion Chips */}
        <div className="px-6 py-4 flex space-x-2 overflow-x-auto scrollbar-hide border-b border-slate-50">
          {suggestionChips.map((chip, idx) => (
            <button 
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="whitespace-nowrap px-4 py-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 text-xs font-medium rounded-full transition-all flex-shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-800 text-white rounded-tr-sm' 
                  : 'bg-white border border-slate-100 shadow-sm rounded-tl-sm text-slate-800'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center text-indigo-600 font-semibold text-xs mb-2">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    InvestIQ Analysis
                  </div>
                )}
                <p>{msg.content}</p>
                
                {/* Citations */}
                {msg.sources && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Source Citations</p>
                    <div className="space-y-2">
                      {msg.sources.map((src, i) => (
                        <div key={i} className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors">
                          <FileText className="w-3.5 h-3.5 text-indigo-500 mr-2 flex-shrink-0" />
                          <span className="text-xs text-slate-600 truncate">{src.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about NVDA..."
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm inset-y-0"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3">
            AI can make mistakes. Verify important financial data.
          </p>
        </div>

      </aside>

    </div>
  );
};

export default Dashboard;
