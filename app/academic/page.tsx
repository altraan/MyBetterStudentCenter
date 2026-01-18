'use client';

import Link from 'next/link';
import HackvilleHeader from '@/components/HackvilleHeader';
import { useLanguage } from '@/components/LanguageContext';

export default function AcademicPage() {
  const { t } = useLanguage();

  return (
    <div className="p-8 max-w-4xl mx-auto pt-20">
      <HackvilleHeader />
      <h1 className="text-3xl font-bold mb-4 text-blue-900">{t('academicHub')}</h1>
      <p className="text-gray-600 mb-8">{t('academicHubDesc')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/academic/grades" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">{t('gradesTranscripts')}</h3>
          <p className="text-sm text-gray-500 mt-2">{t('gradesTranscriptsDesc')}</p>
        </Link>
        <Link href="/academic/progress" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">{t('academicProgress')}</h3>
          <p className="text-sm text-gray-500 mt-2">{t('academicProgressDesc')}</p>
        </Link>
      </div>
    </div>
  );
}
