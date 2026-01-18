"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Menu,
    User,
    ChevronDown,
    LogOut,
    Languages,
    Moon,
    Sun,
    Settings
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { languages, Language } from "@/lib/i18n";

export default function HackvilleHeader() {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark as requested earlier
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const burgerDropdownRef = useRef<HTMLDivElement>(null);
    const { language, setLanguage, t } = useLanguage();

    const currentLanguageName = languages.find((l: any) => l.code === language)?.name || "English";

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserOpen(false);
                setShowLanguages(false);
            }
            if (burgerDropdownRef.current && !burgerDropdownRef.current.contains(event.target as Node)) {
                setIsBurgerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
        setIsUserOpen(false); // Close other menu
    };

    const toggleUser = () => {
        setIsUserOpen(!isUserOpen);
        setIsBurgerOpen(false); // Close other menu
    };

    const toggleLanguages = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowLanguages(!showLanguages);
    };

    const handleLanguageSelect = (code: any) => {
        setLanguage(code);
        setShowLanguages(false);
        setIsBurgerOpen(false); // Close menu on select
    };

    return (
        <header className="fixed top-0 start-0 end-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-6">
            {/* Logo / Title */}
            <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-blue-900">Sheridan</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 h-full">
                {/* Burger Menu */}
                <div className="relative group h-full flex items-center" ref={burgerDropdownRef}>
                    <button
                        onClick={toggleBurger}
                        className={`p-2 rounded-full transition-colors focus:outline-none ${isBurgerOpen ? 'bg-gray-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Menu size={28} />
                    </button>

                    {/* Burger Dropdown Menu */}
                    <div
                        className={`
                            absolute end-0 top-16 w-64 bg-white rounded-b-lg shadow-xl border-x border-b border-gray-100 py-2 overflow-hidden
                            transition-all duration-300 origin-top transform
                            ${isBurgerOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}
                        `}
                    >
                        <div className="py-1">
                            {/* Language selection directly in burger menu for convenience */}
                            <div className="px-4 py-2">
                                <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                    <Languages size={14} className="me-2" />
                                    {t('language')}
                                </div>
                                <div className="max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                    <div className="grid grid-cols-1 gap-1">
                                        {languages.map((lang: any) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageSelect(lang.code)}
                                                className={`text-start px-3 py-2 text-sm rounded-md transition-colors ${language === lang.code
                                                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Dropdown */}
                <div className="relative group h-full flex items-center" ref={userDropdownRef}>
                    <button
                        onClick={toggleUser}
                        className={`flex items-center space-x-2 p-2 rounded-full transition-colors focus:outline-none ${isUserOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white border-2 border-white shadow-sm">
                            <User size={24} />
                        </div>
                        <ChevronDown size={16} className={`text-gray-600 transition-transform duration-300 ${isUserOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown Menu */}
                    <div
                        className={`
                            absolute end-0 top-16 w-72 rounded-b-lg shadow-2xl border-x border-b py-2 overflow-hidden
                            transition-all duration-300 origin-top transform
                            ${isDarkMode
                                ? 'bg-blue-950 border-blue-900/20'
                                : 'bg-white border-gray-100'
                            }
                            ${isUserOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}
                        `}
                    >
                        <div className={`px-5 py-4 border-b text-start ${isDarkMode ? 'border-blue-900/20 bg-blue-900/20' : 'border-gray-50 bg-gray-50/50'}`}>
                            <p className={`text-sm font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('alexStudent')}</p>
                            <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-blue-200/60' : 'text-gray-500'}`}>{t('id')}: 100293847</p>
                        </div>

                        <div className="py-2 space-y-1">
                            {/* Theme Toggle Switch */}
                            <div className="px-5 py-2">
                                <div className={`flex items-center justify-between p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-blue-900/30 border-blue-800/30' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-blue-800/40 text-blue-300' : 'bg-white text-orange-500 shadow-sm'}`}>
                                            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-200' : 'text-gray-600'}`}>
                                            {isDarkMode ? t('darkMode') : t('lightMode')}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsDarkMode(!isDarkMode)}
                                        className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>

                            <div className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`}>
                                {t('accountManagement')}
                            </div>
                        </div>

                        <div className={`border-t pt-1 mt-1 ${isDarkMode ? 'border-blue-900/20' : 'border-gray-100'}`}>
                            <button onClick={() => console.log('logout')} className={`w-full flex items-center px-5 py-3 text-sm transition-all font-semibold group ${isDarkMode ? 'text-red-400 hover:bg-red-400/10' : 'text-red-600 hover:bg-red-50'}`}>
                                <LogOut size={18} className="me-3 transition-transform group-hover:translate-x-1" />
                                {t('logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
