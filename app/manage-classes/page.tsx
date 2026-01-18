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

// Swap Modal Component
function SwapModal({
  course,
  alternatives,
  onSelect,
  onCancel,
  isDarkMode
}: {
  course: EnrolledClass;
  alternatives: EnrolledClass[];
  onSelect: (newSection: EnrolledClass) => void;
  onCancel: () => void;
  isDarkMode: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className={`relative w-full max-w-lg rounded-2xl shadow-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
          Swap Section for {course.code}
        </h3>
        <p className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Select an alternative section below to swap.
        </p>

        <div className="space-y-3 mb-6">
          {alternatives.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${isDarkMode
                ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-blue-500'
                : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-md'
                }`}
              onClick={() => onSelect(alt)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Section {alt.id.split('-')[2]}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                      Open
                    </span>
                  </div>
                  <div className={`text-sm flex items-center gap-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="flex items-center gap-1"><Clock size={14} /> {alt.schedule.days.map(d => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][d]).join(', ')} {alt.startTime} - {alt.endTime}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {alt.room}</span>
                  </div>
                  <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {alt.professor}
                  </div>
                </div>
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <RefreshCw size={18} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onCancel}
          className={`w-full py-3 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

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
  const [selectedEnrolledClass, setSelectedEnrolledClass] = useState<EnrolledClass | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<EnrolledClass[]>(mockEnrolledClasses);

  // Swap State
  const [swapData, setSwapData] = useState<{
    original: EnrolledClass;
    alternatives: EnrolledClass[];
  } | null>(null);

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
    // Check if already enrolled
    if (enrolledClasses.some(c => c.code === course.code)) {
      showToast(`Already enrolled in ${course.code}`);
      return;
    }

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

    setEnrolledClasses(prev => [...prev, newEnrolled]);
    setSelectedCourse(null);
    showToast(`Added ${course.code} - ${course.name}`);
  };

  // Drop Course Handler
  const handleDropClass = (cls: EnrolledClass) => {
    setSelectedEnrolledClass(null); // Close details modal if open
    setConfirmModal({
      show: true,
      title: 'Drop Course',
      message: `Are you sure you want to drop ${cls.code} - ${cls.name}? This action cannot be undone.`,
      confirmText: 'Drop Course',
      variant: 'danger',
      onConfirm: () => {
        setEnrolledClasses(prev => prev.filter(c => c.id !== cls.id));
        setConfirmModal(null);
        showToast(`Dropped ${cls.code}`);
      },
    });
  };

  // Swap Course Handler
  const handleSwapClass = (cls: EnrolledClass) => {
    setSelectedEnrolledClass(null); // Close details modal if open

    // Generate Mock Alternatives
    const mockAlternatives: EnrolledClass[] = [
      {
        ...cls,
        id: cls.id + "-alt1",
        startTime: "2:00 PM",
        endTime: "5:00 PM",
        room: cls.room.replace(/\d+/, "101"),
        professor: "Prof. New Guy",
        schedule: { ...cls.schedule, startHour: 14, endHour: 17, days: [1, 3] } // Tue, Thu
      },
      {
        ...cls,
        id: cls.id + "-alt2",
        startTime: "8:00 AM",
        endTime: "11:00 AM",
        room: cls.room.replace(/\d+/, "305"),
        professor: "Prof. Morning Person",
        schedule: { ...cls.schedule, startHour: 8, endHour: 11, days: [4] } // Fri
      }
    ];

    setSwapData({
      original: cls,
      alternatives: mockAlternatives
    });
  };

  const confirmSwap = (newSection: EnrolledClass) => {
    if (!swapData) return;

    setEnrolledClasses(prev => prev.map(c => c.id === swapData.original.id ? { ...newSection, id: swapData.original.id } : c));
    setSwapData(null);
    showToast(`Swapped section for ${newSection.code}`);
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
              onClassClick={setSelectedEnrolledClass}
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

        {/* Selected Class Details Modal */}
        {selectedEnrolledClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedEnrolledClass(null)} />
            <div className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                      {selectedEnrolledClass.code}
                    </h3>
                    <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {selectedEnrolledClass.name}
                    </p>
                  </div>
                  <button onClick={() => setSelectedEnrolledClass(null)} className={`text-gray-400 hover:text-gray-600`}>×</button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {selectedEnrolledClass.startTime} - {selectedEnrolledClass.endTime}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {selectedEnrolledClass.room}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                      <div className="w-4 h-4 rounded-full border-2 border-current" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Instructor</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        {selectedEnrolledClass.professor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSwapClass(selectedEnrolledClass)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors
                      ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-blue-900'}`}
                  >
                    <RefreshCw size={18} />
                    Swap Class
                  </button>
                  <button
                    onClick={() => handleDropClass(selectedEnrolledClass)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                    Drop Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Detail Modal */}
        <CourseDetailModal
          course={selectedCourse}
          enrolledClasses={enrolledClasses}
          onClose={() => setSelectedCourse(null)}
          onAdd={handleAddCourse}
        />

        {/* Swap Modal */}
        {swapData && (
          <SwapModal
            course={swapData.original}
            alternatives={swapData.alternatives}
            onSelect={confirmSwap}
            onCancel={() => setSwapData(null)}
            isDarkMode={isDarkMode}
          />
        )}

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
