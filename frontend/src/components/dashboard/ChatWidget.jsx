import { useState, useEffect, useRef } from 'react';
import { Activity, Maximize2, Minimize2, Sparkles, FileText, Send, X, Bot } from 'lucide-react';
import { useDashboard } from '../Dashboard';
import { api } from '../../services/api';

const ChatWidget = () => {
  const { isChatOpen, setIsChatOpen, chatInitialMessage, setChatInitialMessage } = useDashboard();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef(null);
  
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      role: 'user',
      content: 'What are the main growth drivers for RELIANCE in the next two quarters?'
    },
    {
      id: 2,
      role: 'ai',
      content: "Reliance's growth over the next two quarters is expected to be driven primarily by sustained momentum in Jio's ARPU and strong retail expansion. Additionally, new energy investments are emerging as meaningful secondary drivers.",
      sources: [
        { title: 'Q3 FY24 Earnings Call Transcript, p.4', type: 'doc' }
      ]
    }
  ]);

  const suggestionChips = [
    "Summarize Q4 Results",
    "Key Risks?",
    "Compare Margins"
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, isExpanded]);

  // Handle incoming initial message from context (when user clicks chart box)
  useEffect(() => {
    if (chatInitialMessage) {
      handleSendMessage(chatInitialMessage);
      setChatInitialMessage(''); // Clear so it doesn't trigger again
    }
  }, [chatInitialMessage]);

  const handleChipClick = (text) => {
    setInputText(text);
  };

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    // Add User Message
    const newUserMsg = { id: Date.now(), role: 'user', content: text };
    setChatHistory(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Call backend API (Phase 7 Streaming simulation behind the scenes in api.js)
      const data = await api.chat.sendMessage(text, { ticker: 'RELIANCE' });
      
      const newAIMsg = {
        id: Date.now() + 1,
        role: 'ai',
        content: data.answer,
        sources: data.sources
      };
      
      setChatHistory(prev => [...prev, newAIMsg]);
    } catch (error) {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: 'Sorry, I am having trouble connecting to my knowledge base right now. Please try again later.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isChatOpen) {
    return (
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed top-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </button>
    );
  }

  return (
    <>
      {isExpanded && <div className="hidden md:block fixed inset-0 bg-slate-900/20 z-30 transition-opacity" onClick={() => setIsExpanded(false)} />}
      <aside className={`${isExpanded ? 'w-full absolute inset-y-0 right-0 md:w-1/2 lg:w-[45%] z-50' : 'w-full absolute inset-y-0 right-0 md:relative md:w-96 z-40'} bg-white border-l border-slate-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 transition-all duration-300 ease-in-out`}>
      <header className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center text-indigo-900 font-bold text-lg">
          <Activity className="w-5 h-5 mr-2 text-indigo-600" />
          InvestIQ Assistant
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
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
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm p-4 flex space-x-1.5 items-center">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative flex items-center">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about RELIANCE..."
            className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm inset-y-0"
          />
          <button type="submit" disabled={!inputText.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-300 text-white rounded-lg transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          AI can make mistakes. Verify important financial data.
        </p>
      </div>
    </aside>
    </>
  );
};

export default ChatWidget;
