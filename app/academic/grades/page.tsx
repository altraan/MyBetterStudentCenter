'use client';

export default function GradesTranscriptsPage() {
  // Mock data based on ERD
  const records = [
    { record_id: '1', term: 'Fall 2025', gpa: 3.8 },
    { record_id: '2', term: 'Winter 2025', gpa: 3.9 },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Grades & Transcripts</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {records.map((record) => (
            <li key={record.record_id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-900">{record.term}</p>
                <p className="text-sm text-gray-500">Official GPA Record</p>
              </div>
              <div className="text-end">
                <p className="text-2xl font-bold text-blue-600">{record.gpa.toFixed(2)}</p>
                <p className="text-xs uppercase tracking-wider text-gray-400">Term GPA</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Download Unofficial Transcript (PDF)
        </button>
      </div>
    </div>
  );
}
