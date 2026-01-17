'use client';

export default function ProfilePage() {
  const profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@sheridancollege.ca',
    sheridanId: '991000001',
    program: 'Software Development and Network Engineering',
  };

  const updates = [
    { update_id: '1', updated_on: '2025-05-20', method: 'Online Portal' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Personal Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
            <p className="mt-1 text-xl font-bold text-gray-900">{profile.firstName} {profile.lastName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide">Sheridan ID</label>
            <p className="mt-1 text-xl font-bold text-gray-900">{profile.sheridanId}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide">Program</label>
            <p className="mt-1 text-lg text-gray-900">{profile.program}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
            <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Update Contact Info
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Profile Updates</h3>
      <div className="bg-white border rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {updates.map((update) => (
            <li key={update.update_id} className="px-6 py-4 flex justify-between text-sm">
              <span className="text-gray-900 font-medium">Updated on {update.updated_on}</span>
              <span className="text-gray-500">Method: {update.method}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
