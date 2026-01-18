"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, ChevronDown, LogOut, Settings, CreditCard, Languages, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { languages } from "@/lib/i18n";

export default function HackvilleHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { language, setLanguage, t } = useLanguage();

    const currentLanguageName = languages.find(l => l.code === language)?.name || "English";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowLanguages(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleLanguages = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowLanguages(!showLanguages);
    };

    const handleLanguageSelect = (code: any) => {
        setLanguage(code);
        // Do not close everything immediately to allow user to see the change if they want, 
        // but the requirement says "when clicked on, it should show available languages"
        // and usually selecting one should close the picker or at least show it's selected.
        setShowLanguages(false);
    };

    return (
        <header className="fixed top-0 start-0 end-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-6">
            {/* Logo / Title */}
            <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-blue-900">Sheridan</h1>
            </div>

            {/* User Actions */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
                        <User size={24} />
                    </div>
                    <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute end-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100 text-start">
                            <p className="text-sm font-semibold text-gray-900">Alex Student</p>
                            <p className="text-xs text-gray-500">{t('id')}: 100293847</p>
                        </div>

                        <div className="py-1">
                            {!showLanguages ? (
                                <>
                                    <button onClick={() => console.log('Profile')} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                                        <Settings size={16} className="me-3 text-gray-400" />
                                        {t('profileSettings') || 'Profile Settings'}
                                    </button>
                                    <button onClick={() => console.log('Card')} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                                        <CreditCard size={16} className="me-3 text-gray-400" />
                                        {t('myCard') || 'My Card'}
                                    </button>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    
                                    <button 
                                        onClick={toggleLanguages} 
                                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <Languages size={16} className="me-3 text-gray-400" />
                                            <span>{t('language') || 'Language'}</span>
                                        </div>
                                        <div className="flex items-center text-xs text-blue-600 font-medium">
                                            {currentLanguageName}
                                            <ChevronRight size={14} className="ms-1 rtl:rotate-180" />
                                        </div>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setShowLanguages(false)} 
                                        className="w-full flex items-center px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-gray-50 border-b border-gray-100 mb-1"
                                    >
                                        <ChevronRight size={16} className="me-2 rotate-180" />
                                        {t('language') || 'Language'}
                                    </button>
                                    <div className="max-h-60 overflow-y-auto py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageSelect(lang.code)}
                                                className={`w-full text-start px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                                                    language === lang.code 
                                                    ? 'bg-blue-50 text-blue-700 font-medium' 
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {lang.name}
                                                {language === lang.code && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="border-t border-gray-100 py-1">
                            <button onClick={() => console.log('logout')} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut size={16} className="me-3" />
                                {t('logout') || 'Logout'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
