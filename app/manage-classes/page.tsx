"use client";

import { useState } from "react";
import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import WeeklySchedule from "@/components/manage-classes/weekly-schedule";
import CourseBrowser, { CourseDetailModal } from "@/components/manage-classes/course-browser";
import { mockEnrolledClasses, mockAvailableCourses, Course, EnrolledClass } from "@/lib/mock-data";
import { ChevronRight, Clock, MapPin, RefreshCw, Trash2, Check, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Confirmation Modal Component
function ConfirmModal({
  title,
  message,
  confirmText,
  confirmVariant = 'danger',
  onConfirm,
  onCancel
}: {
  title: string;
  message: string;
  confirmText: string;
  confirmVariant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className={`relative w-full max-w-sm rounded-2xl shadow-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-2 rounded-full ${confirmVariant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            {confirmVariant === 'danger' ? <AlertTriangle size={20} /> : <Check size={20} />}
          </div>
          <div>
            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${confirmVariant === 'danger'
                ? 'bg-red-600 text-white hover:bg-red-500'
                : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Toast Component
function SuccessToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
        <Check size={20} />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100">×</button>
      </div>
    </div>
  );
}

export default function ManageClassesPage() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<EnrolledClass[]>(mockEnrolledClasses);

  // Modals
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    confirmText: string;
    variant: 'danger' | 'primary';
    onConfirm: () => void;
  } | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Add Course Handler
  const handleAddCourse = (course: Course) => {
    const newEnrolled: EnrolledClass = {
      id: `enrolled-${Date.now()}`,
      code: course.code,
      name: course.name,
      professor: course.professor,
      startTime: `${course.schedule.startHour > 12 ? course.schedule.startHour - 12 : course.schedule.startHour}:00 ${course.schedule.startHour >= 12 ? 'PM' : 'AM'}`,
      endTime: `${course.schedule.endHour > 12 ? course.schedule.endHour - 12 : course.schedule.endHour}:00 ${course.schedule.endHour >= 12 ? 'PM' : 'AM'}`,
      room: course.schedule.room,
      schedule: {
        days: course.schedule.days,
        startHour: course.schedule.startHour,
        endHour: course.schedule.endHour,
      },
    };

    setEnrolledClasses([...enrolledClasses, newEnrolled]);
    setSelectedCourse(null);
    showToast(`Added ${course.code} - ${course.name}`);
  };

  // Drop Course Handler
  const handleDropClass = (cls: EnrolledClass) => {
    setConfirmModal({
      show: true,
      title: 'Drop Course',
      message: `Are you sure you want to drop ${cls.code} - ${cls.name}? This action cannot be undone.`,
      confirmText: 'Drop Course',
      variant: 'danger',
      onConfirm: () => {
        setEnrolledClasses(enrolledClasses.filter(c => c.id !== cls.id));
        setConfirmModal(null);
        showToast(`Dropped ${cls.code}`);
      },
    });
  };

  // Swap Course Handler
  const handleSwapClass = (cls: EnrolledClass) => {
    setConfirmModal({
      show: true,
      title: 'Swap Section',
      message: `Looking for alternative sections for ${cls.code}...`,
      confirmText: 'Find Sections',
      variant: 'primary',
      onConfirm: () => {
        setConfirmModal(null);
        showToast(`Searching for sections of ${cls.code}...`);
      },
    });
  };

  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
              Manage Classes
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Winter 2026 • {enrolledClasses.length} courses enrolled • {enrolledClasses.length * 3} credits
            </p>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left Column - Enrolled Classes + Actions */}
          <div className="xl:col-span-2 space-y-6">

            {/* Currently Enrolled */}
            <div className={`rounded-xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                  Currently Enrolled
                </h2>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {enrolledClasses.length * 3} credits
                </span>
              </div>

              <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {enrolledClasses.map((cls, idx) => (
                  <div
                    key={cls.id}
                    className={`p-4 flex items-center justify-between transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-12 rounded-full ${['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500'][idx % 4]
                        }`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                            {cls.code}
                          </span>
                          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {cls.name}
                          </span>
                        </div>
                        <div className={`flex items-center gap-4 text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {cls.startTime} - {cls.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {cls.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSwapClass(cls)}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-600 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
                        title="Swap section"
                      >
                        <RefreshCw size={16} />
                      </button>
                      <button
                        onClick={() => handleDropClass(cls)}
                        className={`p-2 rounded-lg transition-colors text-red-500 ${isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'}`}
                        title="Drop course"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {enrolledClasses.length === 0 && (
                  <div className={`p-8 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No courses enrolled. Browse courses on the right to add some!
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="#" className="block group">
                <div className={`rounded-xl p-6 flex items-center justify-between transition-all ${isDarkMode
                    ? 'bg-gray-800 border border-gray-700 hover:border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                  <div>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                      Swap Classes
                    </span>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Change section times
                    </p>
                  </div>
                  <ChevronRight className={`group-hover:translate-x-1 transition-transform ${isDarkMode ? 'text-gray-500' : 'text-blue-900'}`} size={24} />
                </div>
              </Link>

              <Link href="#" className="block group">
                <div className={`rounded-xl p-6 flex items-center justify-between transition-all ${isDarkMode
                    ? 'bg-gray-800 border border-gray-700 hover:border-red-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}>
                  <div>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                      Drop Classes
                    </span>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Remove from schedule
                    </p>
                  </div>
                  <ChevronRight className={`group-hover:translate-x-1 transition-transform ${isDarkMode ? 'text-gray-500' : 'text-blue-900'}`} size={24} />
                </div>
              </Link>
            </div>

            {/* Weekly Schedule */}
            <WeeklySchedule
              enrolledClasses={enrolledClasses}
              onSwapClass={handleSwapClass}
              onDropClass={handleDropClass}
            />
          </div>

          {/* Right Column - Course Browser */}
          <div className="xl:col-span-1">
            <CourseBrowser
              availableCourses={mockAvailableCourses}
              enrolledClasses={enrolledClasses}
              onCourseSelect={setSelectedCourse}
            />
          </div>
        </div>

        {/* Course Detail Modal */}
        <CourseDetailModal
          course={selectedCourse}
          enrolledClasses={enrolledClasses}
          onClose={() => setSelectedCourse(null)}
          onAdd={handleAddCourse}
        />

        {/* Confirmation Modal */}
        {confirmModal && (
          <ConfirmModal
            title={confirmModal.title}
            message={confirmModal.message}
            confirmText={confirmModal.confirmText}
            confirmVariant={confirmModal.variant}
            onConfirm={confirmModal.onConfirm}
            onCancel={() => setConfirmModal(null)}
          />
        )}

        {/* Success Toast */}
        {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}
      </div>
    </HackvilleLayout>
  );
}
