'use client';

export default function AddDropClassesPage() {
  const actions = [
    { action_id: '1', enrollment_id: '1', action: 'ADD', action_date: '2025-08-01' },
    { action_id: '2', enrollment_id: '3', action: 'DROP', action_date: '2025-09-10' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Add/Drop Activity</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment ID</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {actions.map((act) => (
              <tr key={act.action_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{act.action_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                  <span className={act.action === 'ADD' ? 'text-green-600' : 'text-red-600'}>
                    {act.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{act.enrollment_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400">
        <h4 className="text-sm font-bold text-yellow-800 uppercase">Important Note</h4>
        <p className="mt-2 text-sm text-yellow-700">
          The deadline to drop classes for a full refund is September 15th, 2025. Dropping after this date may result in financial penalties.
        </p>
      </div>
    </div>
  );
}
