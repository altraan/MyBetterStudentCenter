"use client";

import { useState, useEffect } from "react";
import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { useAccessibility } from "@/components/AccessibilityContext";
import { languages } from "@/lib/i18n";
import {
    Settings,
    BookOpen,
    Palette,
    MessageSquare,
    Type,
    List,
    EyeOff,
    ChevronDown,
    ChevronUp,
    Check,
    X,
    MessageCircle,
    Globe
} from "lucide-react";

// Toggle Switch Component
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: () => void; id: string }) {
    const { isDarkMode } = useTheme();

    return (
        <button
            role="switch"
            aria-checked={checked}
            id={id}
            onClick={onChange}
            className={`
                relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
                focus-visible:ring-blue-600 focus-visible:ring-offset-2
                ${checked
                    ? (isDarkMode ? 'bg-blue-600' : 'bg-blue-600')
                    : (isDarkMode ? 'bg-gray-700' : 'bg-gray-300')}
            `}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`
                    pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 
                    transition duration-200 ease-in-out
                    ${checked ? 'translate-x-6' : 'translate-x-0'}
                `}
            />
        </button>
    );
}

// Collapsible Card Component
function AccessibilityCard({
    title,
    description,
    icon: Icon,
    isOn,
    onToggle,
    id
}: {
    title: string;
    description: string;
    icon: any;
    isOn: boolean;
    onToggle: () => void;
    id: string;
}) {
    const { isDarkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(isOn); // Auto-expand if on, or default open state logic? 
    // Actually, screenshots show descriptions are visible when "expanded" (chevron up) 
    // or maybe the description is ALWAYS visible in the gray box below?
    // Let's implement expandable logic. The toggle is separate from expansion?
    // Screenshot: "Enhance Text" has toggle ON and Chevron DOWN? No, Chevron UP.
    // Wait, let's re-examine image 1. "Enhance Text" toggle is OFF. Chevron is UP. Desc is VISIBLE.
    // Image 2: "Enhance Text" toggle is OFF. Chevron is DOWN. Desc is HIDDEN (implied).

    // So:
    // Header row: Icon, Title, Chevron (to expand/collapse), Toggle (right aligned)
    // Body (if expanded): Description box.

    return (
        <div className="mb-4">
            <div
                className={`
                    rounded-lg p-4 flex items-center justify-between transition-all
                    ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}
                    ${isOpen ? 'rounded-b-none' : ''}
                `}
            >
                <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => setIsOpen(!isOpen)}>
                    <Icon size={24} className={isDarkMode ? 'text-blue-400' : 'text-blue-900'} />
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                        {title}
                    </span>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>

                <Toggle checked={isOn} onChange={onToggle} id={id} />
            </div>

            {isOpen && (
                <div className={`
                    p-4 rounded-b-lg border-t-0
                    ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-300/50 text-gray-700'}
                `}>
                    <p className="text-sm font-medium leading-relaxed">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
}

// Caption Language Selector Component for Multi-language Captions
function CaptionLanguageSelector({ isDarkMode }: { isDarkMode: boolean }) {
    const [selectedLang, setSelectedLang] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("captionLanguage");
        if (saved) setSelectedLang(saved);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        setSelectedLang(lang);
        localStorage.setItem("captionLanguage", lang);
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new Event("captionLanguageChanged"));
    };

    return (
        <div className={`mb-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-3">
                <Globe size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-900'} />
                <label className={`font-medium ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                    Select Caption Language:
                </label>
            </div>
            <select
                value={selectedLang}
                onChange={handleChange}
                className={`
                    mt-3 w-full p-3 rounded-lg border-2 font-medium
                    ${isDarkMode
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                `}
            >
                <option value="">-- Choose a language --</option>
                {languages.filter((l: { code: string; name: string }) => l.code !== 'en').map((lang: { code: string; name: string }) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function AccessibilityPage() {
    const { t } = useLanguage();
    const { isDarkMode, fontFamily, setFontFamily } = useTheme();
    const {
        enhanceText, toggleEnhanceText,
        highContrast, toggleHighContrast,
        multiLangCaptions, toggleMultiLangCaptions,
        simpleEnglish, toggleSimpleEnglish,
        stepByStepGuidance, toggleStepByStepGuidance,
        reduceVisuals, toggleReduceVisuals
    } = useAccessibility();

    return (
        <HackvilleLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                <div className="flex items-center gap-3 border-b pb-4 mb-6">
                    <Settings size={32} className={isDarkMode ? 'text-blue-400' : 'text-blue-900'} />
                    <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                        Accessibility Settings
                    </h1>
                </div>

                {/* General Section */}
                <section>
                    <div className="flex items-center justify-center mb-6">
                        <Settings size={40} className={isDarkMode ? 'text-white' : 'text-blue-900'} strokeWidth={1.5} />
                        <h2 className={`text-2xl font-bold ml-3 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                            General
                        </h2>
                    </div>

                    <AccessibilityCard
                        title="Enhance Text"
                        description="Enlarges text for students with temporary, situational or permanent needs."
                        icon={BookOpen}
                        isOn={enhanceText}
                        onToggle={toggleEnhanceText}
                        id="enhance-text"
                    />

                    <AccessibilityCard
                        title="Colour Contrast"
                        description="Uses very bold contrast, a simplified layout, and extra-large text to make content easier to see and focus on."
                        icon={Palette}
                        isOn={highContrast}
                        onToggle={toggleHighContrast}
                        id="colour-contrast"
                    />

                    <AccessibilityCard
                        title="Dyslexia Friendly Font"
                        description="Transforms the typeface to Helvetica, which is easier to read for some users."
                        icon={Type}
                        isOn={fontFamily === 'helvetica'}
                        onToggle={() => setFontFamily(fontFamily === 'helvetica' ? 'default' : 'helvetica')}
                        id="dyslexia-font"
                    />
                </section>

                <hr className={`my-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />

                {/* Communication Section */}
                <section>
                    <div className="flex items-center justify-center mb-6">
                        <MessageCircle size={40} className={isDarkMode ? 'text-white' : 'text-blue-900'} strokeWidth={1.5} />
                        <h2 className={`text-2xl font-bold ml-3 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                            Communication
                        </h2>
                    </div>

                    <AccessibilityCard
                        title="Multi-language Captions"
                        description="If you don’t want to change the language, you can add multilingual captions that will appear under English text."
                        icon={MessageSquare}
                        isOn={multiLangCaptions}
                        onToggle={toggleMultiLangCaptions}
                        id="multi-lang-captions"
                    />

                    {/* Language Selector - shows when multi-lang captions is enabled */}
                    {multiLangCaptions && (
                        <CaptionLanguageSelector isDarkMode={isDarkMode} />
                    )}

                    <AccessibilityCard
                        title="Concise English Mode"
                        description="For students who prefer simplified sentence structures and common vocabulary to improve comprehension."
                        icon={Type}
                        isOn={simpleEnglish}
                        onToggle={toggleSimpleEnglish}
                        id="simple-english"
                    />
                </section>

                <hr className={`my-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />

                {/* Cognitive & Focus Section */}
                <section>
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            {/* Combined icon for Cognitive - resembling a head/brain */}
                            <svg
                                className={`w-10 h-10 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                        </div>
                        <h2 className={`text-2xl font-bold ml-3 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                            Cognitive & Focus
                        </h2>
                    </div>

                    <AccessibilityCard
                        title="Step-by-Step Guidance"
                        description="Provides additional tooltips, walkthroughs, and explicit instructions for complex tasks."
                        icon={List}
                        isOn={stepByStepGuidance}
                        onToggle={toggleStepByStepGuidance}
                        id="step-by-step"
                    />

                    <AccessibilityCard
                        title="Reduce Visuals"
                        description="Hides decorative images, animations, and non-essential visual elements to reduce distraction."
                        icon={EyeOff}
                        isOn={reduceVisuals}
                        onToggle={toggleReduceVisuals}
                        id="reduce-visuals"
                    />
                </section>
            </div>
        </HackvilleLayout>
    );
}
