"use client";

import { useState } from "react";
import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

// Mock Data Types
interface ServiceRequest {
  id: string;
  number: string;
  type: string;
  subtype: string;
  status: 'Submitted' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  description?: string;
}

// Initial Mock Data
const initialRequests: ServiceRequest[] = [
  {
    id: '1',
    number: 'SR-2026-001',
    type: 'Academic Records',
    subtype: 'Transcript Request',
    status: 'Completed',
    date: '2026-01-10',
  },
  {
    id: '2',
    number: 'SR-2026-002',
    type: 'Financial Aid',
    subtype: 'OSAP Inquiry',
    status: 'In Progress',
    date: '2026-01-15',
  },
  {
    id: '3',
    number: 'SR-2026-003',
    type: 'Admissions',
    subtype: 'Program Transfer',
    status: 'Submitted',
    date: '2026-01-18',
  },
];

const REQUEST_TYPES = {
  'Academic Records': ['Transcript Request', 'Graduation Letter', 'Enrolment Verification'],
  'Financial Aid': ['OSAP Inquiry', 'Bursary Application', 'Fees Extension'],
  'Admissions': ['Program Transfer', 'Re-admission', 'Deferral'],
  'IT Support': ['Password Reset', 'Software Access', 'WiFi Issues'],
  'Facility Services': ['Maintenance', 'Lost and Found', 'Parking'],
};

export default function ServiceRequestsPage() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [requests, setRequests] = useState<ServiceRequest[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Request Form State
  const [newRequestType, setNewRequestType] = useState<string>('');
  const [newRequestSubtype, setNewRequestSubtype] = useState<string>('');
  const [newRequestDescription, setNewRequestDescription] = useState('');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestType || !newRequestSubtype) return;

    const newReq: ServiceRequest = {
      id: Date.now().toString(),
      number: `SR-2026-${String(requests.length + 1).padStart(3, '0')}`,
      type: newRequestType,
      subtype: newRequestSubtype,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      description: newRequestDescription
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    // Reset form
    setNewRequestType('');
    setNewRequestSubtype('');
    setNewRequestDescription('');
  };

  return (
    <HackvilleLayout>
      <div className="max-w-6xl mx-auto py-8 space-y-6">

        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
            My Service Requests
          </h1>
          <div className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <ChevronLeft size={16} className="cursor-pointer hover:text-blue-500" />
            <span>1 of 1</span>
            <ChevronRight size={16} className="cursor-pointer hover:text-blue-500" />
          </div>
        </div>

        {/* Table Section */}
        <div className={`rounded-lg overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-blue-900'} font-bold uppercase`}>
                <tr>
                  <th className="px-6 py-3 border-r border-gray-300/20">Request Number</th>
                  <th className="px-6 py-3 border-r border-gray-300/20">Request Type</th>
                  <th className="px-6 py-3 border-r border-gray-300/20">Request Subtype</th>
                  <th className="px-6 py-3 border-r border-gray-300/20">Status</th>
                  <th className="px-6 py-3">Status Date</th>
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
                {requests.length > 0 ? (
                  requests.map((req) => (
                    <tr key={req.id} className={`border-t ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                        {req.number}
                      </td>
                      <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {req.type}
                      </td>
                      <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {req.subtype}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                                            px-2 py-1 rounded text-xs font-semibold
                                            ${req.status === 'Completed' ? 'bg-green-100 text-green-700' : ''}
                                            ${req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}
                                            ${req.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' : ''}
                                            ${req.status === 'Cancelled' ? 'bg-red-100 text-red-700' : ''}
                                        `}>
                          {req.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {req.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No service requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Empty rows filler if needed to match height? No, standard table height is fine. */}
          {/* The screenshot shows empty grid lines. I can simulate that if requested, but dynamic is better. */}
          <div className={`border-t h-32 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            {/* Just filler space to look like the screenshot's empty rows */}
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-10 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`} />
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`
                    px-6 py-2 rounded shadow-sm font-medium transition-colors border
                    ${isDarkMode
                ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'}
                `}
          >
            Create New Request
          </button>
        </div>

        {/* Create Request Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <div className={`relative w-full max-w-lg rounded-xl shadow-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Create New Request
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Request Type
                  </label>
                  <select
                    value={newRequestType}
                    onChange={(e) => {
                      setNewRequestType(e.target.value);
                      setNewRequestSubtype('');
                    }}
                    required
                    className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  >
                    <option value="">Select a type...</option>
                    {Object.keys(REQUEST_TYPES).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {newRequestType && (
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Request Subtype
                    </label>
                    <select
                      value={newRequestSubtype}
                      onChange={(e) => setNewRequestSubtype(e.target.value)}
                      required
                      className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="">Select a subtype...</option>
                      {(REQUEST_TYPES as any)[newRequestType].map((sub: string) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description / Details
                  </label>
                  <textarea
                    value={newRequestDescription}
                    onChange={(e) => setNewRequestDescription(e.target.value)}
                    rows={4}
                    className={`w-full p-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    placeholder="Please provide additional details..."
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </HackvilleLayout>
  );
}
