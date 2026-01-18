"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

interface PrivacyToggleProps {
    storageKey: string; // unique key for localStorage
    children: React.ReactNode;
    hiddenText?: string; // what to show when hidden, e.g. "****"
    className?: string;
}

export default function PrivacyToggle({
    storageKey,
    children,
    hiddenText = "••••••",
    className = ""
}: PrivacyToggleProps) {
    const { isDarkMode } = useTheme();
    const [isHidden, setIsHidden] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem(`privacy-${storageKey}`);
        if (saved === 'true') {
            setIsHidden(true);
        }
    }, [storageKey]);

    const toggleVisibility = () => {
        const newState = !isHidden;
        setIsHidden(newState);
        localStorage.setItem(`privacy-${storageKey}`, String(newState));
    };

    if (!mounted) {
        return <span className={className}>{children}</span>;
    }

    return (
        <div className="relative inline-flex items-center gap-2 group">
            <span className={className}>
                {isHidden ? hiddenText : children}
            </span>
            <button
                onClick={toggleVisibility}
                className={`p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 ${isDarkMode
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                        : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                    }`}
                title={isHidden ? 'Show' : 'Hide'}
                aria-label={isHidden ? 'Show value' : 'Hide value'}
            >
                {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
        </div>
    );
}
