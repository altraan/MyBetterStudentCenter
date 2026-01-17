import Link from 'next/link';

export default function AcademicPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Academic Hub</h1>
      <p className="text-gray-600 mb-8">Manage your grades, transcripts, and track your progress toward graduation.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/academic/grades" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Grades & Transcripts</h3>
          <p className="text-sm text-gray-500 mt-2">View term GPAs and download official records.</p>
        </Link>
        <Link href="/academic/progress" className="border p-6 rounded-lg hover:bg-blue-50 transition border-blue-100 shadow-sm">
          <h3 className="font-bold text-xl text-blue-800">Academic Progress</h3>
          <p className="text-sm text-gray-500 mt-2">Track requirements and degree completion status.</p>
        </Link>
      </div>
    </div>
  );
}
