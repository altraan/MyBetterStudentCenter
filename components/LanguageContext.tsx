'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations, simpleEnTranslations } from '@/lib/i18n';
import { useAccessibility } from './AccessibilityContext';

type TranslationKey = keyof typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Separate provider component that uses accessibility
function LanguageProviderInner({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const accessibilityContext = useAccessibility();
  const simpleEnglish = accessibilityContext?.simpleEnglish ?? false;

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      document.documentElement.lang = savedLang;
      if (savedLang === 'ar' || savedLang === 'ur') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    // Handle RTL languages
    if (lang === 'ar' || lang === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const t = (key: TranslationKey): string => {
    // If Simple English mode is enabled and we're viewing in English
    if (simpleEnglish && language === 'en') {
      const simpleTranslation = simpleEnTranslations[key as keyof typeof simpleEnTranslations];
      if (simpleTranslation) {
        return simpleTranslation;
      }
    }

    const langTranslations = translations[language] as Record<string, string>;
    const enTranslations = translations['en'] as Record<string, string>;
    return langTranslations[key as string] || enTranslations[key as string] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Wrapper that doesn't require AccessibilityProvider to be present
export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageProviderInner>{children}</LanguageProviderInner>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
