"use client";

import { useState, useEffect } from "react";

import { useLanguage } from "@/components/LanguageContext";

export default function ProgressChart() {
    const { t } = useLanguage();
    const targetProgress = 58;
    const [progress, setProgress] = useState(0);
    const [showText, setShowText] = useState(false);
    // Use the same geometry as AcademicProgressCard (r=45, stroke=10)
    // but put it in a viewBox to scale to the parent container
    const circumference = 2 * Math.PI * 45;

    useEffect(() => {
        // Start ring animation shortly after mount
        const ringTimer = setTimeout(() => {
            setProgress(targetProgress);
        }, 100);

        // Show text after ring animation is mostly complete
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 600);

        return () => {
            clearTimeout(ringTimer);
            clearTimeout(textTimer);
        };
    }, []);

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                {/* Background Circle */}
                <circle
                    cx="64"
                    cy="64"
                    r="45"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="10"
                    fill="none"
                />
                {/* Progress Circle */}
                <circle
                    cx="64"
                    cy="64"
                    r="45"
                    stroke="#1e3a8a"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                />
            </svg>

            {/* Centered Text */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-500 transform ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <span className="text-6xl font-bold text-blue-900">{targetProgress}%</span>
                <span className="text-xl text-blue-900 mt-2">{t('complete')}</span>
            </div>
        </div>
    );
}
