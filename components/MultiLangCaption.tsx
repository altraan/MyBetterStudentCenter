"use client";

import { useAccessibility } from "./AccessibilityContext";
import { useLanguage } from "./LanguageContext";
import { translations } from "@/lib/i18n";

interface MultiLangCaptionProps {
    children: React.ReactNode;
    translationKey?: string;
    className?: string;
}

/**
 * Component that shows text with a translated caption beneath it
 * when Multi-language Captions mode is enabled.
 */
export default function MultiLangCaption({
    children,
    translationKey,
    className = ""
}: MultiLangCaptionProps) {
    const { multiLangCaptions } = useAccessibility();
    const { language } = useLanguage();

    // Don't show caption if disabled or if already viewing in the target language
    if (!multiLangCaptions || language === 'en') {
        return <>{children}</>;
    }

    // Get the translation if a key is provided
    let translatedText: string | undefined;
    if (translationKey) {
        const langTranslations = translations[language] as Record<string, string>;
        translatedText = langTranslations[translationKey];
    }

    return (
        <span className={`multi-lang-wrapper ${className}`}>
            {children}
            {translatedText && (
                <span className="multi-lang-caption block text-sm opacity-75 italic">
                    {translatedText}
                </span>
            )}
        </span>
    );
}
