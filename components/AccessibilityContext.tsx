"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityState {
    enhanceText: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    multiLangCaptions: boolean;
    simpleEnglish: boolean;
    stepByStepGuidance: boolean;
    reduceVisuals: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
    toggleEnhanceText: () => void;
    toggleHighContrast: () => void;
    toggleTextToSpeech: () => void;
    toggleMultiLangCaptions: () => void;
    toggleSimpleEnglish: () => void;
    toggleStepByStepGuidance: () => void;
    toggleReduceVisuals: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [enhanceText, setEnhanceText] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [textToSpeech, setTextToSpeech] = useState(false);
    const [multiLangCaptions, setMultiLangCaptions] = useState(false);
    const [simpleEnglish, setSimpleEnglish] = useState(false);
    const [stepByStepGuidance, setStepByStepGuidance] = useState(false);
    const [reduceVisuals, setReduceVisuals] = useState(false);

    // Persist settings (optional, but good practice)
    useEffect(() => {
        const savedSettings = localStorage.getItem("accessibility-settings");
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setEnhanceText(parsed.enhanceText || false);
                setHighContrast(parsed.highContrast || false);
                setTextToSpeech(parsed.textToSpeech || false);
                setMultiLangCaptions(parsed.multiLangCaptions || false);
                setSimpleEnglish(parsed.simpleEnglish || false);
                setStepByStepGuidance(parsed.stepByStepGuidance || false);
                setReduceVisuals(parsed.reduceVisuals || false);
            } catch (e) {
                console.error("Failed to parse accessibility settings", e);
            }
        }
    }, []);

    useEffect(() => {
        const settings = {
            enhanceText,
            highContrast,
            textToSpeech,
            multiLangCaptions,
            simpleEnglish,
            stepByStepGuidance,
            reduceVisuals
        };
        localStorage.setItem("accessibility-settings", JSON.stringify(settings));

        // Apply classes to document body/html for global effects
        const root = document.documentElement;

        if (enhanceText) root.classList.add('enhance-text');
        else root.classList.remove('enhance-text');

        if (highContrast) root.classList.add('high-contrast');
        else root.classList.remove('high-contrast');

        if (reduceVisuals) root.classList.add('reduce-visuals');
        else root.classList.remove('reduce-visuals');

        if (simpleEnglish) root.classList.add('simple-english');
        else root.classList.remove('simple-english');

        if (stepByStepGuidance) root.classList.add('step-guidance');
        else root.classList.remove('step-guidance');

        if (multiLangCaptions) root.classList.add('multi-lang-captions');
        else root.classList.remove('multi-lang-captions');

    }, [enhanceText, highContrast, textToSpeech, multiLangCaptions, simpleEnglish, stepByStepGuidance, reduceVisuals]);

    const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter(prev => !prev);

    return (
        <AccessibilityContext.Provider value={{
            enhanceText, toggleEnhanceText: toggle(setEnhanceText),
            highContrast, toggleHighContrast: toggle(setHighContrast),
            textToSpeech, toggleTextToSpeech: toggle(setTextToSpeech),
            multiLangCaptions, toggleMultiLangCaptions: toggle(setMultiLangCaptions),
            simpleEnglish, toggleSimpleEnglish: toggle(setSimpleEnglish),
            stepByStepGuidance, toggleStepByStepGuidance: toggle(setStepByStepGuidance),
            reduceVisuals, toggleReduceVisuals: toggle(setReduceVisuals),
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (context === undefined) {
        throw new Error("useAccessibility must be used within an AccessibilityProvider");
    }
    return context;
};
