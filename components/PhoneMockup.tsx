'use client';

import { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface PhoneMockupProps {
    children: React.ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
    const [demoMode, setDemoMode] = useState(false);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setDemoMode(!demoMode)}
                className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all"
                title={demoMode ? "Switch to Desktop View" : "Switch to Phone Demo"}
            >
                {demoMode ? (
                    <>
                        <Monitor size={20} />
                        <span className="hidden sm:inline">Desktop</span>
                    </>
                ) : (
                    <>
                        <Smartphone size={20} />
                        <span className="hidden sm:inline">Phone Demo</span>
                    </>
                )}
            </button>

            {/* Content */}
            {demoMode ? (
                <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4 overflow-auto">
                    {/* Phone Frame */}
                    <div className="relative" style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}>
                        {/* Phone Body */}
                        <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800">
                            {/* Screen */}
                            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner relative">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black h-6 w-40 rounded-b-2xl z-10"></div>

                                {/* Phone Screen Content */}
                                <div className="w-[430px] h-[750px] overflow-y-auto">
                                    {children}
                                </div>
                            </div>
                        </div>

                        {/* Power Button */}
                        <div className="absolute -right-2 top-24 w-1 h-12 bg-gray-700 rounded-l"></div>

                        {/* Volume Buttons */}
                        <div className="absolute -left-2 top-20 w-1 h-8 bg-gray-700 rounded-r"></div>
                        <div className="absolute -left-2 top-32 w-1 h-8 bg-gray-700 rounded-r"></div>
                    </div>
                </div>
            ) : (
                <>{children}</>
            )}
        </>
    );
}