"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { Course, EnrolledClass, hasScheduleConflict, formatSchedule } from "@/lib/mock-data";
import { AlertTriangle, Clock, MapPin, User, BookOpen, ChevronRight, X, GraduationCap } from "lucide-react";

interface CourseBrowserProps {
    availableCourses: Course[];
    enrolledClasses: EnrolledClass[];
    onCourseSelect: (course: Course) => void;
}

export default function CourseBrowser({ availableCourses, enrolledClasses, onCourseSelect }: CourseBrowserProps) {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState<'core' | 'elective'>('core');
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = availableCourses.filter(course => {
        const matchesTab = course.type === activeTab;
        const matchesSearch = searchQuery === "" ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className={`rounded-xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            {/* Header */}
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                    <BookOpen size={24} />
                    Browse Available Courses
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click on a course to view details and add to your schedule
                </p>
            </div>

            {/* Tabs */}
            <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <button
                    onClick={() => setActiveTab('core')}
                    className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${activeTab === 'core'
                            ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-900 text-white')
                            : (isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
                        }`}
                >
                    Core Courses ({availableCourses.filter(c => c.type === 'core').length})
                </button>
                <button
                    onClick={() => setActiveTab('elective')}
                    className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${activeTab === 'elective'
                            ? (isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-700 text-white')
                            : (isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
                        }`}
                >
                    Electives ({availableCourses.filter(c => c.type === 'elective').length})
                </button>
            </div>

            {/* Search */}
            <div className="p-3">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border text-sm ${isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                />
            </div>

            {/* Course List */}
            <div className="max-h-96 overflow-y-auto">
                {filteredCourses.length === 0 ? (
                    <div className={`p-8 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        No courses found
                    </div>
                ) : (
                    filteredCourses.map(course => {
                        const hasConflict = hasScheduleConflict(course, enrolledClasses);
                        const isFull = course.seats.available === 0;

                        return (
                            <button
                                key={course.id}
                                onClick={() => onCourseSelect(course)}
                                className={`w-full p-4 border-b text-left transition-colors ${isDarkMode
                                        ? 'border-gray-700 hover:bg-gray-700/50'
                                        : 'border-gray-100 hover:bg-gray-50'
                                    } ${hasConflict ? (isDarkMode ? 'bg-red-900/20' : 'bg-red-50') : ''}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                                                {course.code}
                                            </span>
                                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {course.name}
                                            </span>
                                            {hasConflict && (
                                                <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                                                    <AlertTriangle size={12} />
                                                    Conflict
                                                </span>
                                            )}
                                            {isFull && (
                                                <span className="text-xs font-medium text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                                                    Full
                                                </span>
                                            )}
                                        </div>

                                        <div className={`flex items-center gap-4 mt-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {formatSchedule(course.schedule)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} />
                                                {course.schedule.room}
                                            </span>
                                        </div>

                                        <div className={`flex items-center gap-4 mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            <span className="flex items-center gap-1">
                                                <User size={12} />
                                                {course.professor}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <GraduationCap size={12} />
                                                {course.credits} credits
                                            </span>
                                            <span>
                                                Seats: {course.seats.available}/{course.seats.total}
                                            </span>
                                        </div>
                                    </div>

                                    <ChevronRight className={`flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// Course Detail Modal Component
interface CourseDetailModalProps {
    course: Course | null;
    enrolledClasses: EnrolledClass[];
    onClose: () => void;
    onAdd: (course: Course) => void;
}

export function CourseDetailModal({ course, enrolledClasses, onClose, onAdd }: CourseDetailModalProps) {
    const { isDarkMode } = useTheme();

    if (!course) return null;

    const hasConflict = hasScheduleConflict(course, enrolledClasses);
    const isFull = course.seats.available === 0;
    const canAdd = !hasConflict && !isFull;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className={`relative w-full max-w-lg rounded-2xl shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Header */}
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${course.type === 'core' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <span className={`text-sm font-medium ${course.type === 'core' ? 'text-blue-600' : 'text-purple-600'}`}>
                                {course.type === 'core' ? 'Core Course' : 'Elective'}
                            </span>
                            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {course.code}
                            </h2>
                            <h3 className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {course.name}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Conflict Warning */}
                    {hasConflict && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                            <AlertTriangle className="flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-medium">Schedule Conflict Detected</p>
                                <p className="text-sm opacity-80">This course overlaps with your current schedule.</p>
                            </div>
                        </div>
                    )}

                    {isFull && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                            <AlertTriangle className="flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-medium">Course Full</p>
                                <p className="text-sm opacity-80">No seats available. Join waitlist?</p>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Description</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {course.description}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Schedule</p>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {formatSchedule(course.schedule)}
                            </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Room</p>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {course.schedule.room}
                            </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Professor</p>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {course.professor}
                            </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seats Available</p>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {course.seats.available} / {course.seats.total}
                            </p>
                        </div>
                    </div>

                    {/* Prerequisites */}
                    {course.prerequisites.length > 0 && (
                        <div>
                            <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Prerequisites</h4>
                            <div className="flex flex-wrap gap-2">
                                {course.prerequisites.map((prereq, i) => (
                                    <span
                                        key={i}
                                        className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                                    >
                                        {prereq}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${isDarkMode
                                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onAdd(course)}
                            disabled={!canAdd}
                            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${canAdd
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {hasConflict ? 'Cannot Add (Conflict)' : isFull ? 'Join Waitlist' : 'Add Course'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
