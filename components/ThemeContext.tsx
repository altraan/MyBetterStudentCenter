'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontFamily = 'default' | 'helvetica';

interface ThemeContextType {
    isDarkMode: boolean;
    setIsDarkMode: (dark: boolean) => void;
    toggleDarkMode: () => void;
    fontFamily: FontFamily;
    setFontFamily: (font: FontFamily) => void;
    dyslexiaMode: boolean;
    setDyslexiaMode: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkModeState] = useState(false);
    const [fontFamily, setFontFamilyState] = useState<FontFamily>('default');
    const [dyslexiaMode, setDyslexiaModeState] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedDarkMode = localStorage.getItem('darkMode');
        const savedFont = localStorage.getItem('fontFamily') as FontFamily;
        const savedDyslexia = localStorage.getItem('dyslexiaMode');

        if (savedDarkMode !== null) {
            const isDark = savedDarkMode === 'true';
            setIsDarkModeState(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        }

        if (savedFont && (savedFont === 'default' || savedFont === 'helvetica')) {
            setFontFamilyState(savedFont);
            document.documentElement.classList.toggle('font-comic', savedFont === 'helvetica');
        }

        if (savedDyslexia !== null) {
            setDyslexiaModeState(savedDyslexia === 'true');
        }
    }, []);

    const setIsDarkMode = (dark: boolean) => {
        setIsDarkModeState(dark);
        localStorage.setItem('darkMode', String(dark));
        document.documentElement.classList.toggle('dark', dark);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const setFontFamily = (font: FontFamily) => {
        setFontFamilyState(font);
        localStorage.setItem('fontFamily', font);
        document.documentElement.classList.toggle('font-comic', font === 'helvetica');
    };

    const setDyslexiaMode = (enabled: boolean) => {
        setDyslexiaModeState(enabled);
        localStorage.setItem('dyslexiaMode', String(enabled));
    };

    // Always provide context - use defaults before mounted
    return (
        <ThemeContext.Provider
            value={{
                isDarkMode,
                setIsDarkMode,
                toggleDarkMode,
                fontFamily,
                setFontFamily,
                dyslexiaMode,
                setDyslexiaMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
