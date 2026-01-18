'use client';

export default function FinancialAidPage() {
  const aidAwards = [
    { aid_id: '1', type: 'OSAP Grant', award_amount: 3200, status: 'Disbursed' },
    { aid_id: '2', type: 'Sheridan Entrance Scholarship', award_amount: 1000, status: 'Pending' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Financial Aid</h1>
      
      <div className="grid gap-6">
        {aidAwards.map((aid) => (
          <div key={aid.aid_id} className="bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{aid.type}</h3>
              <p className="text-gray-500">Status: <span className={`font-semibold ${aid.status === 'Disbursed' ? 'text-green-600' : 'text-yellow-600'}`}>{aid.status}</span></p>
            </div>
            <div className="text-end">
              <p className="text-2xl font-bold text-gray-900">${aid.award_amount.toFixed(2)}</p>
              <p className="text-xs text-gray-400 uppercase">Award Amount</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
        <h3 className="font-bold text-gray-700 mb-2">Need more assistance?</h3>
        <p className="text-gray-600 mb-4">You can apply for additional bursaries or work-study programs through the student portal.</p>
        <button className="text-blue-600 font-semibold hover:underline">View Available Bursaries &rarr;</button>
      </div>
    </div>
  );
}
