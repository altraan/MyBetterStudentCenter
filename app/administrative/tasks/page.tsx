'use client';

export default function TasksHoldsPage() {
  const items = [
    { task_id: '1', type: 'HOLD', status: 'Active', due_date: 'N/A', description: 'Financial Hold - Outstanding Balance' },
    { task_id: '2', type: 'TASK', status: 'Pending', due_date: '2025-09-30', description: 'Submit Final High School Transcript' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Tasks & Holds</h1>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.task_id} className={`p-6 rounded-lg border-s-8 shadow-sm bg-white ${item.type === 'HOLD' ? 'border-red-500' : 'border-yellow-500'}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${item.type === 'HOLD' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {item.type}
                </span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{item.description}</h3>
                <p className="text-sm text-gray-500">Status: {item.status}</p>
              </div>
              {item.due_date !== 'N/A' && (
                <div className="text-end">
                  <p className="text-xs text-gray-400 uppercase">Due Date</p>
                  <p className="font-semibold text-gray-900">{item.due_date}</p>
                </div>
              )}
            </div>
            {item.type === 'HOLD' && (
              <div className="mt-4 p-3 bg-red-50 rounded text-sm text-red-700">
                <strong>Impact:</strong> You are currently restricted from registering for new classes.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
