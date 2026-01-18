"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/ThemeContext";
import { mockEnrolledClasses, EnrolledClass } from "@/lib/mock-data";
import { X, Clock, MapPin, User, RefreshCw, Trash2 } from "lucide-react";

const daysFull = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hours = Array.from({ length: 10 }, (_, i) => i + 8);

const colors = [
    "bg-blue-200 border-blue-300 text-blue-800",
    "bg-emerald-200 border-emerald-300 text-emerald-800",
    "bg-purple-200 border-purple-300 text-purple-800",
];

const darkColors = [
    "bg-blue-900/40 border-blue-700 text-blue-200",
    "bg-emerald-900/40 border-emerald-700 text-emerald-200",
    "bg-purple-900/40 border-purple-700 text-purple-200",
];

interface ScheduleEvent {
    id: string;
    originalClass: EnrolledClass;
    dayIndex: number;
    startHour: number;
    durationHours: number;
}

interface WeeklyScheduleProps {
    enrolledClasses: EnrolledClass[];
    onSwapClass?: (cls: EnrolledClass) => void;
    onDropClass?: (cls: EnrolledClass) => void;
}

function getScheduleEvents(classes: EnrolledClass[]): ScheduleEvent[] {
    const events: ScheduleEvent[] = [];
    classes.forEach((cls) => {
        cls.schedule.days.forEach(dayIndex => {
            events.push({
                id: `${cls.id}-${dayIndex}`,
                originalClass: cls,
                dayIndex,
                startHour: cls.schedule.startHour,
                durationHours: cls.schedule.endHour - cls.schedule.startHour,
            });
        });
    });
    return events;
}

// Class Detail Popup Component
function ClassDetailPopup({
    cls,
    onClose,
    onSwap,
    onDrop
}: {
    cls: EnrolledClass;
    onClose: () => void;
    onSwap?: (cls: EnrolledClass) => void;
    onDrop?: (cls: EnrolledClass) => void;
}) {
    const { isDarkMode } = useTheme();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative w-full max-w-md rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Header */}
                <div className={`p-5 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                    >
                        <X size={18} />
                    </button>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                        Enrolled Course
                    </div>
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{cls.code}</h2>
                    <h3 className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cls.name}</h3>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <User size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Professor</span>
                            </div>
                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cls.professor}</p>
                        </div>
                        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Room</span>
                            </div>
                            <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cls.room}</p>
                        </div>
                    </div>

                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <Clock size={14} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Schedule</span>
                        </div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {cls.schedule.days.map(d => daysFull[d].slice(0, 3)).join(', ')} • {cls.startTime} - {cls.endTime}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className={`p-5 border-t flex gap-3 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <button
                        onClick={() => onSwap?.(cls)}
                        className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${isDarkMode
                                ? 'bg-blue-600 text-white hover:bg-blue-500'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                    >
                        <RefreshCw size={16} />
                        Swap Section
                    </button>
                    <button
                        onClick={() => onDrop?.(cls)}
                        className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${isDarkMode
                                ? 'bg-red-600 text-white hover:bg-red-500'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                    >
                        <Trash2 size={16} />
                        Drop Course
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function WeeklySchedule({
    enrolledClasses = mockEnrolledClasses,
    onSwapClass,
    onDropClass
}: WeeklyScheduleProps) {
    const { isDarkMode } = useTheme();
    const [selectedClass, setSelectedClass] = useState<EnrolledClass | null>(null);
    const scheduleEvents = getScheduleEvents(enrolledClasses);

    const formatHour = (hour: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour} ${period}`;
    };

    const handleSwap = (cls: EnrolledClass) => {
        setSelectedClass(null);
        onSwapClass?.(cls);
    };

    const handleDrop = (cls: EnrolledClass) => {
        setSelectedClass(null);
        onDropClass?.(cls);
    };

    return (
        <>
            <div className={`rounded-xl border shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Weekly Schedule</h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Click on a class to view details
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                        <div className={`grid grid-cols-[60px_repeat(5,1fr)] border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                            <div className={`p-3 text-xs font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Time</div>
                            {daysFull.map((day, i) => (
                                <div key={i} className={`p-3 text-center font-semibold text-sm border-l ${isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            {hours.map((hour) => (
                                <div key={hour} className={`grid grid-cols-[60px_repeat(5,1fr)] h-16 border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
                                    <div className={`px-2 pt-1 text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {formatHour(hour)}
                                    </div>
                                    {[0, 1, 2, 3, 4].map((dayIdx) => (
                                        <div key={dayIdx} className={`border-l ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'}`} />
                                    ))}
                                </div>
                            ))}

                            {scheduleEvents.map((event, idx) => {
                                const top = (event.startHour - 8) * 64;
                                const height = event.durationHours * 64 - 4;
                                const left = `calc(60px + ${event.dayIndex} * (100% - 60px) / 5)`;
                                const width = `calc((100% - 60px) / 5 - 4px)`;
                                const colorClass = isDarkMode ? darkColors[idx % darkColors.length] : colors[idx % colors.length];

                                return (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedClass(event.originalClass)}
                                        className={`absolute rounded-lg border p-2 mx-0.5 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg hover:z-10 ${colorClass}`}
                                        style={{ top: `${top}px`, height: `${height}px`, left, width }}
                                    >
                                        <div className="text-xs font-bold truncate">{event.originalClass.code}</div>
                                        <div className="text-xs truncate opacity-80">{event.originalClass.name}</div>
                                        {event.durationHours >= 2 && (
                                            <div className="text-xs truncate opacity-60 mt-1">{event.originalClass.room}</div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {selectedClass && (
                <ClassDetailPopup
                    cls={selectedClass}
                    onClose={() => setSelectedClass(null)}
                    onSwap={handleSwap}
                    onDrop={handleDrop}
                />
            )}
        </>
    );
}
