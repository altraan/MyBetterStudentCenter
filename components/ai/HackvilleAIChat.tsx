"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, User, Bot } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function HackvilleAIChat() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { role: "assistant", content: t('aiGreeting') }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Update greeting when language changes
    useEffect(() => {
        setChatHistory([{ role: "assistant", content: t('aiGreeting') }]);
    }, [t]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isOpen]);

    const handleSend = () => {
        if (!message.trim()) return;

        const newHistory = [...chatHistory, { role: "user", content: message }];
        setChatHistory(newHistory);
        setMessage("");

        // Simulated AI response
        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                role: "assistant",
                content: t('aiDisclaimer')
            }]);
        }, 1000);
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
                fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-blue-50 overflow-hidden z-50
                transition-all duration-500 transform origin-bottom-right
                ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}
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
                    className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
                >
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                                ${msg.role === 'user'
                                    ? 'bg-blue-900 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-blue-50 rounded-bl-none'}
                            `}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-blue-50">
                    <div className="relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('askMeSomething')}
                            className="w-full bg-gray-50 border border-blue-100 rounded-xl py-3 ps-4 pe-14 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/20 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-900 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
