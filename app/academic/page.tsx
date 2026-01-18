'use client';

import Link from 'next/link';
import HackvilleLayout from '@/components/HackvilleLayout';
import { useLanguage } from '@/components/LanguageContext';

export default function AcademicPage() {
  const { t } = useLanguage();

  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-900 inline-block pb-1">
            {t('academicHub')}
          </h1>
        </header>
        <p className="text-gray-600 mb-8">{t('academicHubDesc')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/academic/grades" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm bg-white">
            <h3 className="font-bold text-xl text-blue-800">{t('gradesTranscripts')}</h3>
            <p className="text-sm text-gray-500 mt-2">{t('gradesTranscriptsDesc')}</p>
          </Link>
          <Link href="/academic/progress" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm bg-white">
            <h3 className="font-bold text-xl text-blue-800">{t('academicProgress')}</h3>
            <p className="text-sm text-gray-500 mt-2">{t('academicProgressDesc')}</p>
          </Link>
        </div>
      </div>
    </HackvilleLayout>
  );
}
