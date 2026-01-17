'use client';

export default function CourseEnrollmentPage() {
  const enrollments = [
    { enrollment_id: '1', course_id: 'PROG24444', term: 'Fall 2025', status: 'Enrolled' },
    { enrollment_id: '2', course_id: 'DBAS12345', term: 'Fall 2025', status: 'Enrolled' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Current Enrollment</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {enrollments.map((enroll) => (
            <li key={enroll.enrollment_id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900">{enroll.course_id}</p>
                <p className="text-sm text-gray-500">{enroll.term}</p>
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {enroll.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Register for Classes
        </button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
          View Weekly Schedule
        </button>
      </div>
    </div>
  );
}
