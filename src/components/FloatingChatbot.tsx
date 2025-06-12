// src/components/FloatingChatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Bot,
  User,
  Loader2,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { chatbotService } from '../services/ChatbotService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence?: number;
  source?: 'api' | 'fallback';
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya JobMate AI Assistant. Ada yang bisa saya bantu terkait karir dan lowongan kerja?',
      sender: 'bot',
      timestamp: new Date(),
      confidence: 1.0,
      source: 'api'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isApiHealthy, setIsApiHealthy] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Check API health on component mount
  useEffect(() => {
    const checkApiHealth = async () => {
      const healthy = await chatbotService.healthCheck();
      setIsApiHealthy(healthy);
    };
    
    checkApiHealth();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use ChatbotService instead of static responses
      const result = await chatbotService.processQuestion(currentInput);
      
      // Add realistic delay for better UX
      const delay = Math.min(1000 + (result.response.length * 20), 3000);
      
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: result.response,
          sender: 'bot',
          timestamp: new Date(),
          confidence: result.confidence,
          source: result.source
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        
        // Update API health status
        setIsApiHealthy(result.source === 'api');
      }, delay);
      
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      setTimeout(() => {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Maaf, saya sedang mengalami gangguan teknis. Silakan coba lagi dalam beberapa saat.',
          sender: 'bot',
          timestamp: new Date(),
          confidence: 0,
          source: 'fallback'
        };
        
        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
        setIsApiHealthy(false);
      }, 1000);
    }
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    // Auto-send quick action
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  // Get dynamic quick actions from service
  const quickActions = chatbotService.getQuickActions().slice(0, 3);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`mb-4 transition-all duration-300 ease-in-out transform ${
            isMinimized 
              ? 'w-72 h-16 sm:w-80' 
              : 'w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[500px]'
          } ${isOpen ? 'animate-in slide-in-from-bottom-2 fade-in' : ''}`}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-900/20 border border-gray-200/50 overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">JobMate Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      isApiHealthy ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                    }`}></div>
                    <p className="text-blue-100 text-xs">
                      {isTyping ? 'Sedang mengetik...' : isApiHealthy ? 'Online' : 'Offline Mode'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {!isApiHealthy && (
                  <div className="p-1" title="API sedang bermasalah, menggunakan mode fallback">
                    <AlertCircle size={14} className="text-yellow-300" />
                  </div>
                )}
                {!isMinimized && (
                  <button
                    onClick={minimizeChat}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
                    title="Minimize"
                  >
                    <Minimize2 size={16} className="text-white" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Close"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Minimized State */}
            {isMinimized && (
              <div 
                onClick={maximizeChat}
                className="flex-1 flex items-center justify-center cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-2 text-gray-600">
                  <ChevronUp size={16} className="transition-transform duration-200 group-hover:-translate-y-1" />
                  <p className="text-sm font-medium">Klik untuk membuka chat</p>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-300`}
                    >
                      <div className={`flex items-end space-x-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                            : message.source === 'fallback' 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-purple-500 to-blue-500'
                        }`}>
                          {message.sender === 'user' ? (
                            <User size={12} className="text-white" />
                          ) : (
                            <Bot size={12} className="text-white" />
                          )}
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`relative px-3 py-2 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md shadow-blue-200/50'
                            : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-gray-200/50 rounded-bl-md shadow-lg shadow-gray-200/30'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className={`text-xs ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString('id-ID', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                          
                          {/* Message tail */}
                          <div className={`absolute bottom-0 ${
                            message.sender === 'user' 
                              ? 'right-0 translate-x-1 border-l-8 border-l-blue-600 border-t-8 border-t-transparent' 
                              : 'left-0 -translate-x-1 border-r-8 border-r-white border-t-8 border-t-transparent'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-1 duration-300">
                      <div className="flex items-end space-x-2 max-w-[80%]">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Bot size={12} className="text-white" />
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg shadow-gray-200/30 relative">
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                          {/* Typing indicator tail */}
                          <div className="absolute bottom-0 left-0 -translate-x-1 border-r-8 border-r-white border-t-8 border-t-transparent"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ketik pesan Anda..."
                        className="w-full px-4 py-2.5 pr-12 border border-gray-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 hover:border-blue-300/50"
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 shadow-sm hover:shadow-md"
                      >
                        {isTyping ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Send size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-lg hover:from-blue-200 hover:to-purple-200 transition-all duration-200 border border-blue-200/50"
                      >
                        {action.length > 15 ? action.substring(0, 15) + '...' : action}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="relative group">
        <button
          onClick={toggleChat}
          className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden ${
            !isOpen ? 'animate-bounce' : ''
          }`}
        >
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
          
          {isOpen ? (
            <X size={20} className="transition-all duration-300 relative z-10" />
          ) : (
            <MessageCircle size={20} className="transition-all duration-300 group-hover:scale-110 relative z-10" />
          )}
          
          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse shadow-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          )}
        </button>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
              Chat dengan JobMate AI
              <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingChatbot;