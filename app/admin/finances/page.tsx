"use client";

import Link from 'next/link';
import { useLanguage } from "@/components/LanguageContext";

export default function FinancialOversight() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">{t('financialOversight')}</h1>
          <p className="text-gray-600">{t('adminAccess')}</p>
        </header>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">{t('revenueSummary')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium">{t('totalTuitionCollected')}</p>
              <p className="text-2xl font-bold text-green-800">$1,240,500</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 font-medium">{t('pendingPayments')}</p>
              <p className="text-2xl font-bold text-blue-800">$312,000</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-600 font-medium">{t('financialAidDisbursed')}</p>
              <p className="text-2xl font-bold text-purple-800">$450,000</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">{t('recentTransactions')}</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('studentID')}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('type')}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('amount')}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">991234567</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t('tuitionPayment')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+$2,500.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
