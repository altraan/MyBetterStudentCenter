import Link from 'next/link';

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Admin access to student and staff records.</p>
        </header>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">System Users</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add New User</button>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Doe</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">991234567</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Student</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">Active</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-purple-600 hover:text-purple-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
