"use client";

import React, { useState, useEffect } from "react";
import { useAccessibility } from "./AccessibilityContext";

interface MultiLangTextProps {
    children: string;
    className?: string;
    as?: React.ElementType;
}

/**
 * Component that renders English text with translated caption below
 * when multi-language captions mode is enabled
 */
export default function MultiLangText({
    children,
    className = "",
    as: Tag = "span"
}: MultiLangTextProps) {
    const { multiLangCaptions } = useAccessibility();
    const [captionLanguage, setCaptionLanguage] = useState<string | null>(null);
    const [translation, setTranslation] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    // Get caption language from localStorage
    useEffect(() => {
        const savedCaptionLang = localStorage.getItem("captionLanguage");
        if (savedCaptionLang) {
            setCaptionLanguage(savedCaptionLang);
        }
    }, []);

    // Listen for caption language changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedCaptionLang = localStorage.getItem("captionLanguage");
            setCaptionLanguage(savedCaptionLang);
        };

        window.addEventListener("storage", handleStorageChange);
        // Also listen for custom event for same-tab updates
        window.addEventListener("captionLanguageChanged", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("captionLanguageChanged", handleStorageChange);
        };
    }, []);

    // Fetch translation when needed
    useEffect(() => {
        if (!multiLangCaptions || !captionLanguage || captionLanguage === "en" || !children) {
            setTranslation("");
            return;
        }

        const fetchTranslation = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/translate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: children,
                        targetLanguage: captionLanguage
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    setTranslation(data.translation);
                }
            } catch (error) {
                console.error("Translation error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTranslation();
    }, [multiLangCaptions, captionLanguage, children]);

    if (!multiLangCaptions || !captionLanguage || captionLanguage === "en") {
        return <Tag className={className}>{children}</Tag>;
    }

    return (
        <Tag className={className}>
            {children}
            {(isLoading || translation) && (
                <span className="multi-lang-caption block text-sm opacity-70 italic">
                    {isLoading ? "..." : translation}
                </span>
            )}
        </Tag>
    );
}
