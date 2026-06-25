import { useState } from 'react';
import { Activity, Maximize2, Sparkles, FileText, Send } from 'lucide-react';

const ChatWidget = () => {
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
  );
};

export default ChatWidget;
