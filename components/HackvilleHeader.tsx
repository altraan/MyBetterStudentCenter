"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, ChevronDown, LogOut, Settings, CreditCard } from "lucide-react";

export default function HackvilleHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center justify-between px-6">
            {/* Logo / Title */}
            <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-blue-900">Hackville</h1>
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
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">Alex Student</p>
                            <p className="text-xs text-gray-500">ID: 100293847</p>
                        </div>

                        <div className="py-1">
                            <button onClick={() => console.log('Profile')} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                                <Settings size={16} className="mr-3 text-gray-400" />
                                Profile Settings
                            </button>
                            <button onClick={() => console.log('Card')} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                                <CreditCard size={16} className="mr-3 text-gray-400" />
                                My Card
                            </button>
                        </div>

                        <div className="border-t border-gray-100 py-1">
                            <button onClick={() => console.log('logout')} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut size={16} className="mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
