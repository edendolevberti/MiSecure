import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "היי! אני העוזר החכם של MiSecure. זקוק לעזרה בבחירת מצלמה לבית או לחניה?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userText = inputValue;
    setInputValue('');
    setLoadingState(LoadingState.LOADING);

    // Add user message
    const newUserMsg: ChatMessage = { role: 'user', text: userText, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMsg]);

    // Get response from Gemini
    const responseText = await sendMessageToGemini(userText);
    
    // Add model message
    const newModelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, newModelMsg]);
    setLoadingState(LoadingState.IDLE);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button - Moved to left for RTL */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-mi-orange'
        } text-white`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window - Moved to left */}
      <div
        className={`fixed bottom-24 left-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 transition-all duration-300 origin-bottom-left flex flex-col overflow-hidden ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-l from-gray-900 to-gray-800 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-white font-bold">Mi Assistant</h3>
            <p className="text-gray-300 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              מחובר ל-Gemini AI
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-mi-orange text-white rounded-tr-none'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loadingState === LoadingState.LOADING && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 shadow-sm border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs">מקליד...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="שאל אותי על מצלמות..."
              className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 rounded-xl pr-4 pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-mi-orange/50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loadingState === LoadingState.LOADING || !inputValue.trim()}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-mi-orange hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} className="rotate-180" /> {/* Flip send icon for RTL */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;