'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import HackvilleHeader from '@/components/HackvilleHeader';

export default function CourseManagement() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <HackvilleHeader />
      <div className="p-8 max-w-4xl mx-auto pt-24">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; {t('backToDashboard')}</Link>
          <h1 className="text-3xl font-bold text-gray-900">{t('courseManagement')}</h1>
          <p className="text-gray-600">{t('courseManagementDesc')}</p>
        </header>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">{t('activeCourses')}</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">{t('createNewCourse')}</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('courseCode')}</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('title')}</th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('enrollment')}</th>
                  <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PROG12345</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Intro to Web Development</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 / 50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button className="text-purple-600 hover:text-purple-900">{t('manage')}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
