'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import HackvilleHeader from '@/components/HackvilleHeader';

export default function FinancialPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <HackvilleHeader />
      <div className="p-8 max-w-4xl mx-auto pt-24">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">{t('financeHub')}</h1>
        <p className="text-gray-600 mb-8">{t('financeHubDesc')}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/financial/payments" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm bg-white">
            <h3 className="font-bold text-xl text-blue-800">{t('tuitionPayments')}</h3>
            <p className="text-sm text-gray-500 mt-2">{t('viewPaymentsDesc')}</p>
          </Link>
          <Link href="/financial/aid" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm bg-white">
            <h3 className="font-bold text-xl text-blue-800">{t('financialAid')}</h3>
            <p className="text-sm text-gray-500 mt-2">{t('viewAidDesc')}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
