'use client';

import { useState } from 'react';
import Link from 'next/link';
import AccessToggle from '@/components/AccessToggle';

export default function Home() {
  const [role, setRole] = useState<'student' | 'admin'>('student');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-900">myStudentCenter</h1>
        <p className="text-xl text-gray-600 mt-2">Better Student Information System</p>
      </header>

      <AccessToggle role={role} setRole={setRole} />

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {role === 'student' ? (
          <>
            <Link href="/academic" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">Academics</h2>
              <p className="text-gray-600">Grades, Transcripts, Graduation Progress</p>
            </Link>

            <Link href="/financial" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">Finances</h2>
              <p className="text-gray-600">Tuition, OSAP, Payments</p>
            </Link>

            <Link href="/registration" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">Registration</h2>
              <p className="text-gray-600">Add/Drop Classes, Search Catalog</p>
            </Link>

            <Link href="/administrative" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800">Self-Service</h2>
              <p className="text-gray-600">Profile, Holds, Contact Info</p>
            </Link>
          </>
        ) : (
          <>
            <Link href="/admin/users" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">User Management</h2>
              <p className="text-gray-600">Manage students, faculty, and staff accounts.</p>
            </Link>

            <Link href="/admin/courses" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">Course Management</h2>
              <p className="text-gray-600">Edit course catalog, schedules, and enrollment limits.</p>
            </Link>

            <Link href="/admin/finances" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">Financial Oversight</h2>
              <p className="text-gray-600">Review tuition charges, payments, and financial aid disbursements.</p>
            </Link>

            <Link href="/admin/holds" className="block p-6 bg-white shadow rounded-lg hover:shadow-md transition border-l-4 border-purple-600">
              <h2 className="text-2xl font-bold text-purple-800">System Holds</h2>
              <p className="text-gray-600">Manage account restrictions and student status flags.</p>
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
