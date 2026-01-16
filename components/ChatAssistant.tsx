
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Loader2 } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your Bloomview Growth Assistant. How can I help you see your opportunities clearly today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "Something went wrong." }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-brand-indigo text-white p-4 rounded-full shadow-2xl hover:brightness-110 transition-all transform hover:scale-110 active:scale-95 flex items-center space-x-2 group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform text-brand-gold" />
        <span className="hidden sm:inline font-extrabold pr-2">Growth Assistant</span>
      </button>

      {/* Chat Drawer */}
      <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-full sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl z-[60] flex flex-col transition-all duration-300 transform border-t-4 border-brand-gold sm:border-t-0 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-brand-indigo p-6 sm:rounded-t-3xl text-white flex justify-between items-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/10 rounded-full blur-xl"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className="bg-white/10 p-2 rounded-lg border border-white/20">
              <Bot size={24} className="text-brand-gold" />
            </div>
            <div>
              <h3 className="font-bold text-lg heading-serif">Consultation AI</h3>
              <p className="text-xs text-slate-300">Bloomview Support System</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors relative z-10">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-light/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-indigo text-white rounded-br-none' 
                  : 'bg-white text-slate-700 rounded-bl-none border border-brand-indigo/5'
              }`}>
                <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-3 border border-brand-indigo/5">
                <Loader2 size={16} className="animate-spin text-brand-indigo" />
                <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Analyzing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask about study abroad or IT..."
            className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo transition-all font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-brand-indigo text-white p-3 rounded-xl hover:brightness-125 disabled:opacity-50 transition-all shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
