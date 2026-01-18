'use client';

import { useLanguage } from './LanguageContext';
import { languages, Language } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            language === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
