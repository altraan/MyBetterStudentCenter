'use client';

export default function MessageCentrePage() {
  const messages = [
    { message_id: '1', subject: 'Financial Aid Package Ready', sent_date: '2025-08-20', status: 'Unread' },
    { message_id: '2', subject: 'Registration Deadline Reminder', sent_date: '2025-08-15', status: 'Read' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Message Centre</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {messages.map((msg) => (
            <li key={msg.message_id} className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${msg.status === 'Unread' ? 'bg-blue-50' : ''}`}>
              <div>
                <p className={`text-lg ${msg.status === 'Unread' ? 'font-bold text-blue-900' : 'text-gray-900'}`}>{msg.subject}</p>
                <p className="text-sm text-gray-500">{msg.sent_date}</p>
              </div>
              <div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${msg.status === 'Unread' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {msg.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
