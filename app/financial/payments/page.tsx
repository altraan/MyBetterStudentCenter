'use client';

import { useLanguage } from '@/components/LanguageContext';
import HackvilleHeader from '@/components/HackvilleHeader';

export default function TuitionPaymentsPage() {
  const { t } = useLanguage();
  const account = {
    balance: 1250.50,
  };

  const recentPayments = [
    { payment_id: '101', amount: 500, payment_date: '2025-08-15', method: 'Credit Card' },
    { payment_id: '102', amount: 1500, payment_date: '2025-01-10', method: 'Bank Transfer' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HackvilleHeader />
      <div className="p-8 max-w-4xl mx-auto pt-24">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">{t('tuitionPayments')}</h1>
        
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-xl flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider">{t('outstandingBalance')}</h2>
            <p className="text-5xl font-extrabold text-blue-900 mt-2">${account.balance.toFixed(2)}</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
            {t('makePayment')}
          </button>
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-800">{t('paymentHistory')}</h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('method')}</th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">{t('amount')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPayments.map((payment) => (
                <tr key={payment.payment_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.payment_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-end font-semibold">${payment.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
