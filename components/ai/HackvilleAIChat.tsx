"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, User, Bot, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export default function HackvilleAIChat() {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        { role: "assistant", content: t('aiGreeting') }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Update greeting when language changes
    useEffect(() => {
        // Only reset if it's the initial state to avoid wiping convo on lang switch
        if (chatHistory.length === 1 && chatHistory[0].role === 'assistant') {
            setChatHistory([{ role: "assistant", content: t('aiGreeting') }]);
        }
    }, [t]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isOpen, isLoading]);

    const handleSend = async () => {
        if (!message.trim() || isLoading) return;

        const userMessage = message;
        setMessage("");
        setError(null);
        setIsLoading(true);

        const newHistory: ChatMessage[] = [...chatHistory, { role: "user", content: userMessage }];
        setChatHistory(newHistory);

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: newHistory
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch response');
            }

            setChatHistory(prev => [...prev, {
                role: "assistant",
                content: data.response
            }]);
        } catch (err) {
            console.error(err);
            setError("Sorry, I'm having trouble connecting right now. Please check your API key.");
            setChatHistory(prev => [...prev, {
                role: "assistant",
                content: "I'm having trouble connecting to my brain right now. Please try again later."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* AI Toggle Button - Bottom Right */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform
                        ${isOpen ? 'bg-white text-blue-900 rotate-90 scale-110' : 'bg-blue-900 text-white hover:scale-110 hover:rotate-12'}
                        group border-2 border-blue-900/10
                    `}
                >
                    {isOpen ? <X size={28} /> : <Sparkles size={28} className="group-hover:animate-pulse" />}
                </button>

                {/* Visual indicator/label */}
                {!isOpen && (
                    <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest">
                        {t('aiChat')}
                    </div>
                )}
            </div>

            {/* Chat Window */}
            <div className={`
                fixed bottom-24 right-6 w-80 md:w-96 rounded-2xl shadow-2xl border overflow-hidden z-50
                transition-all duration-500 transform origin-bottom-right
                ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
                ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-50'}
            `}>
                {/* Header */}
                <div className="bg-blue-900 p-4 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold leading-tight">{t('sheridanAssistant')}</h3>
                            <div className="flex items-center">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full me-2 animate-pulse"></span>
                                <span className="text-[10px] opacity-80 uppercase font-semibold tracking-wider">{t('aiIntegrationActive')}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Container */}
                <div
                    ref={scrollRef}
                    className={`h-80 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}
                >
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                ${msg.role === 'user'
                                    ? 'bg-blue-900 text-white rounded-br-none'
                                    : (isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-800 border-blue-50') + ' border rounded-bl-none'} whitespace-pre-wrap
                            `}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className={`p-3 rounded-2xl rounded-bl-none shadow-sm border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-blue-50'}`}>
                                <Loader2 size={16} className={`animate-spin ${isDarkMode ? 'text-gray-400' : 'text-blue-900'}`} />
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex justify-center my-2">
                            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                                <AlertCircle size={12} />
                                <span>Connection Error</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-50'}`}>
                    <div className="relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('askMeSomething')}
                            disabled={isLoading}
                            className={`
                                w-full rounded-xl py-3 ps-4 pe-14 text-sm transition-all focus:outline-none focus:ring-2 
                                ${isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500/50'
                                    : 'bg-gray-50 border-blue-100 text-gray-900 placeholder-gray-400 focus:ring-blue-900/20'}
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || isLoading}
                            className={`
                                absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors 
                                ${isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                    : 'bg-blue-900 hover:bg-blue-800 text-white'}
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
