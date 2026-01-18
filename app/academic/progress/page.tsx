'use client';

export default function AcademicProgressPage() {
  const progress = {
    status: 'In Progress',
    requirement_summary: '85% Complete - 3 courses remaining for graduation.',
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Academic Progress</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border-s-8 border-green-500">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Degree Status</h2>
            <p className="text-gray-600">Current Standing: <span className="font-semibold text-green-600">{progress.status}</span></p>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">On Track</span>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Requirement Summary</h3>
          <p className="mt-1 text-lg text-gray-900">{progress.requirement_summary}</p>
        </div>

        <div className="mt-6 w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-600 h-4 rounded-full" style={{ width: '85%' }}></div>
        </div>
        <p className="text-end text-sm text-gray-500 mt-2">85% Complete</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded bg-gray-50">
          <h4 className="font-bold mb-2">Major Requirements</h4>
          <p className="text-sm text-gray-600 italic">21/24 Credits Completed</p>
        </div>
        <div className="border p-4 rounded bg-gray-50">
          <h4 className="font-bold mb-2">Elective Requirements</h4>
          <p className="text-sm text-gray-600 italic">12/12 Credits Completed</p>
        </div>
      </div>
    </div>
  );
}
