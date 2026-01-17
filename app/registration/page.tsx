import Link from 'next/link';

export default function RegistrationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Registration Hub</h1>
      <p className="text-gray-600 mb-8">Add or Drop classes and manage your course enrollment.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/registration/enrollment" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Current Enrollment</h3>
          <p className="text-sm text-gray-500 mt-2">View your registered classes and weekly schedule.</p>
        </Link>
        <Link href="/registration/add-drop" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Add/Drop Activity</h3>
          <p className="text-sm text-gray-500 mt-2">Track recent course changes and enrollment actions.</p>
        </Link>
      </div>
    </div>
  );
}
