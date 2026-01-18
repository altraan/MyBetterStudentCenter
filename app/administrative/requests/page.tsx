'use client';

export default function ServiceRequestsPage() {
  const requests = [
    { request_id: '1', category: 'Official Transcript Request', status: 'Completed', created_on: '2025-06-12' },
    { request_id: '2', category: 'Change of Program', status: 'Under Review', created_on: '2025-08-05' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Student Service Requests</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.request_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.created_on}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${req.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Create New Request
        </button>
      </div>
    </div>
  );
}
