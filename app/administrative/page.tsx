import Link from 'next/link';

export default function AdministrativePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Administrative Hub</h1>
      <p className="text-gray-600 mb-8">Manage your profile, view messages, and track tasks or service requests.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/administrative/profile" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Personal Profile</h3>
          <p className="text-sm text-gray-500 mt-2">Update contact information and view profile history.</p>
        </Link>
        <Link href="/administrative/messages" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Message Centre</h3>
          <p className="text-sm text-gray-500 mt-2">Official communications and system notifications.</p>
        </Link>
        <Link href="/administrative/tasks" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Tasks & Holds</h3>
          <p className="text-sm text-gray-500 mt-2">Manage account restrictions and pending to-do items.</p>
        </Link>
        <Link href="/administrative/requests" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Service Requests</h3>
          <p className="text-sm text-gray-500 mt-2">Request transcripts, program changes, or other services.</p>
        </Link>
      </div>
    </div>
  );
}
