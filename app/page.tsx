'use client';

import { useState } from 'react';
import Link from 'next/link';
import AccessToggle from '@/components/AccessToggle';
import HackvilleHeader from '@/components/HackvilleHeader';
import { useLanguage } from '@/components/LanguageContext';

export default function Home() {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pt-20">
      <HackvilleHeader />
      <header className="text-center mb-4">
        <h1 className="text-4xl font-extrabold text-blue-900">{t('title')}</h1>
        <p className="text-xl text-gray-600 mt-2">{t('subtitle')}</p>
      </header>

      <AccessToggle role={role} setRole={setRole} />

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {role === 'student' ? (
          <>
            <Link href="/academic" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">{t('academics')}</h2>
              <p className="text-gray-600">{t('academicsDesc')}</p>
            </Link>

            <Link href="/financial" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">{t('finances')}</h2>
              <p className="text-gray-600">{t('financesDesc')}</p>
            </Link>

            <Link href="/registration" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">{t('registration')}</h2>
              <p className="text-gray-600">{t('registrationDesc')}</p>
            </Link>

            <Link href="/administrative" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">{t('selfService')}</h2>
              <p className="text-gray-600">{t('selfServiceDesc')}</p>
            </Link>

            <Link href="/ai-chat" className="block p-6 bg-blue-50 shadow rounded-lg hover:shadow-md transition border-s-4 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                {t('aiChat')}
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wider">{t('new')}</span>
              </h2>
              <p className="text-gray-600">{t('aiChatDesc')}</p>
            </Link>
          </>
        ) : (
          <>
            <Link href="/admin/users" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">{t('userManagement')}</h2>
              <p className="text-gray-600">{t('userManagementDesc')}</p>
            </Link>

            <Link href="/admin/courses" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">{t('courseManagement')}</h2>
              <p className="text-gray-600">{t('courseManagementDesc')}</p>
            </Link>

            <Link href="/admin/finances" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">{t('financialOversight')}</h2>
              <p className="text-gray-600">{t('financialOversightDesc')}</p>
            </Link>

            <Link href="/admin/holds" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-s-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">{t('systemHolds')}</h2>
              <p className="text-gray-600">{t('systemHoldsDesc')}</p>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
