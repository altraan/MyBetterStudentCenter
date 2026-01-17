import Link from 'next/link';

export default function FinancialPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Financial Hub</h1>
      <p className="text-gray-600 mb-8">Manage your tuition bills, payments, and financial aid records.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/financial/payments" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Tuition & Payments</h3>
          <p className="text-sm text-gray-500 mt-2">View balances, payment history, and make payments.</p>
        </Link>
        <Link href="/financial/aid" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Financial Aid</h3>
          <p className="text-sm text-gray-500 mt-2">View OSAP, scholarships, and bursary awards.</p>
        </Link>
      </div>
    </div>
  );
}
