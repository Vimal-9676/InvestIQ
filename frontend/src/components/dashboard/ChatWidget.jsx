import { useState, useRef, useEffect } from 'react';
import { Activity, Sparkles, Send, Loader2, MessageSquare, History } from 'lucide-react';
import axios from 'axios';

const ChatWidget = ({ currentSymbol, isOpen, setIsOpen }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'history'
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef(null);
  
  const [chatHistory, setChatHistory] = useState([
    {
      _id: 'default',
      role: 'ai',
      content: "Hello! I'm InvestIQ's AI agent. Ask me anything about stocks, financial data, or upload a document for deeper analysis. Note: I do not provide direct investment recommendations."
    }
  ]);
  const [savedSessions, setSavedSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    if (activeTab === 'history') {
      fetchSessions();
    }
  }, [activeTab]);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/ai/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedSessions(res.data.sessions || []);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const loadSession = async (sessionId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/ai/history/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory(res.data.session.messages);
      setCurrentSessionId(sessionId);
      setActiveTab('chat');
    } catch (err) {
      console.error('Failed to load session', err);
    }
  };

  const startNewChat = () => {
    setChatHistory([
      {
        _id: 'default',
        role: 'ai',
        content: "Hello! I'm InvestIQ's AI agent. Ask me anything about stocks, financial data, or upload a document for deeper analysis. Note: I do not provide direct investment recommendations."
      }
    ]);
    setCurrentSessionId(null);
    setActiveTab('chat');
  };

  useEffect(() => {
    if (scrollRef.current && activeTab === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, activeTab]);

  const suggestionChips = [
    "Summarize Q4 Results",
    "Key Risks?",
    "Compare Margins"
  ];

  const handleChipClick = (text) => {
    setInputText(text);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const tempId = Date.now().toString();
    const userMessage = { _id: tempId, role: 'user', content: inputText };
    setChatHistory(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', {
        question: userMessage.content,
        symbol: currentSymbol,
        sessionId: currentSessionId
      });
      
      const aiMessage = { _id: Date.now().toString() + 'ai', role: 'ai', content: res.data.answer };
      setChatHistory(prev => [...prev, aiMessage]);
      if (res.data.sessionId && !currentSessionId) {
        setCurrentSessionId(res.data.sessionId);
      }
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { _id: Date.now().toString() + 'err', role: 'ai', content: "Sorry, I encountered an error while fetching the analysis." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (isMinimized) {
    return (
      <div 
        className={`fixed z-50 top-6 right-6 cursor-pointer flex flex-col items-center gap-1 ${!isOpen && 'hidden lg:flex'}`}
        onClick={() => { setIsMinimized(false); setIsOpen(true); }}
      >
        <div className="bg-white p-3 rounded-full shadow-lg border border-indigo-100 hover:shadow-xl hover:bg-indigo-50 transition-all">
          <span className="text-3xl animate-bounce block">🤖</span>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full shadow-sm">Ask anything?</span>
      </div>
    );
  }

  return (
    <aside className={`absolute lg:relative z-40 bg-white border-l border-slate-200 flex flex-col h-full right-0 shadow-[0_0_40px_rgba(0,0,0,0.1)] lg:shadow-[-4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 w-full sm:w-[400px] lg:w-96 flex-shrink-0`}>
      <header className="px-4 lg:px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white to-indigo-50/50">
        <div className="flex items-center text-slate-900 font-black text-lg tracking-tight">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white mr-2.5 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          InvestIQ AI
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Tabs inside Header */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-2 lg:px-3 py-1 text-xs font-medium rounded-md flex items-center transition-all ${activeTab === 'chat' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <MessageSquare className="w-3.5 h-3.5 lg:mr-1" /> <span className="hidden lg:inline">Chat</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-2 lg:px-3 py-1 text-xs font-medium rounded-md flex items-center transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <History className="w-3.5 h-3.5 lg:mr-1" /> <span className="hidden lg:inline">History</span>
            </button>
          </div>
          <button 
            onClick={() => { setIsMinimized(true); setIsOpen(false); }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      {activeTab === 'chat' ? (
        <>
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
            {chatHistory.map((msg, index) => (
              <div key={msg._id || index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm p-4 text-slate-400 flex items-center text-sm">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Analyzing...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask about ${currentSymbol}...`}
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm inset-y-0"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3">
              AI can make mistakes. Verify important financial data.
            </p>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Previous Conversations</h3>
            <button onClick={startNewChat} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
              + New Chat
            </button>
          </div>
          <div className="space-y-3">
            {savedSessions.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No history found</p>}
            {savedSessions.map((session) => (
              <div 
                key={session._id} 
                onClick={() => loadSession(session._id)}
                className={`p-4 rounded-xl border shadow-sm cursor-pointer transition-colors ${currentSessionId === session._id ? 'border-indigo-500 bg-indigo-50' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
              >
                <h4 className="text-slate-800 font-medium text-sm mb-1 truncate">{session.title}</h4>
                <p className="text-slate-400 text-xs">{new Date(session.updatedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default ChatWidget;
