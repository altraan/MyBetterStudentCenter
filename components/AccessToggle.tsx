'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';

interface AccessToggleProps {
  role: 'student' | 'admin';
  setRole: (role: 'student' | 'admin') => void;
}

export default function AccessToggle({ role, setRole }: AccessToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="flex bg-gray-200 p-1 rounded-lg mb-8">
      <button
        onClick={() => setRole('student')}
        className={`px-4 py-2 rounded-md transition ${
          role === 'student'
            ? 'bg-blue-600 text-white shadow'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        {t('studentView')}
      </button>
      <button
        onClick={() => setRole('admin')}
        className={`px-4 py-2 rounded-md transition ${
          role === 'admin'
            ? 'bg-blue-600 text-white shadow'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        {t('adminView')}
      </button>
    </div>
  );
}
