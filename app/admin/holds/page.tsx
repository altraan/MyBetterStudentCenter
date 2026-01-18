import Link from 'next/link';

export default function SystemHolds() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">System Holds</h1>
          <p className="text-gray-600">Manage account restrictions and student status flags.</p>
        </header>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Active Holds</h2>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Apply New Hold</button>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Hold Type</th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">991234567</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Financial Hold</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unpaid Winter 2026 tuition</td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">Release</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
