import React from "react";
import { EnrolledClass } from "@/lib/mock-data";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";

interface WeeklyScheduleProps {
    enrolledClasses: EnrolledClass[];
    onClassClick: (cls: EnrolledClass) => void;
    onSwapClass: (cls: EnrolledClass) => void;
    onDropClass: (cls: EnrolledClass) => void;
}

const hours = [
    "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM",
    "2:00PM", "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM",
    "8:00PM", "9:00PM", "10:00PM"
];

export default function WeeklySchedule({ enrolledClasses, onClassClick }: WeeklyScheduleProps) {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();

    const days = [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday")
    ];

    return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-1 rounded-sm shadow-sm`}>
            {/* Header */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} p-2 border-b`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{t('calendarView')}</h2>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} overflow-auto max-h-[600px]`}>
                <div className="min-w-[800px] grid grid-cols-[80px_repeat(5,1fr)] auto-rows-[80px] text-xs relative">

                    {/* Header Row */}
                    <div className={`border-b border-r ${isDarkMode ? 'border-gray-700 text-gray-200 bg-gray-900' : 'border-gray-300 text-gray-900 bg-white'} p-2 font-bold h-16 flex items-end sticky top-0 left-0 z-30`}>
                        {t('time')}
                    </div>
                    {days.map((day, i) => (
                        <div key={i} className={`border-b border-r ${isDarkMode ? 'border-gray-700 text-gray-200 bg-gray-900' : 'border-gray-300 text-gray-900 bg-white'} p-2 font-bold text-center whitespace-pre-line flex items-end justify-center h-16 sticky top-0 z-20`}>
                            {day}
                        </div>
                    ))}

                    {/* Grid Cells (Background) */}
                    {hours.map((time, r) => (
                        <React.Fragment key={`row-${r}`}>
                            <div className={`border-b border-r ${isDarkMode ? 'border-gray-700 text-gray-400 bg-gray-900' : 'border-gray-300 text-gray-500 bg-white'} p-2 font-medium sticky left-0 z-10`} style={{ gridRow: r + 2, gridColumn: 1 }}>
                                {time}
                            </div>
                            {Array.from({ length: 5 }).map((_, c) => (
                                <div key={`cell-${r}-${c}`} className={`border-b border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} style={{ gridRow: r + 2, gridColumn: c + 2 }}></div>
                            ))}
                        </React.Fragment>
                    ))}

                    {/* Schedule Items (Overlay) */}
                    {enrolledClasses.map((item, i) => {
                        // item.schedule.days is number[] where 0=Mon, 1=Tue, ...
                        // Grid Columns: 1=Time, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri

                        return item.schedule.days.map((dayIndex, dIdx) => {
                            const col = dayIndex + 2;

                            // Calculate row start (8:00 AM is index 0 in hours -> row 2)
                            // range starts at 8. so 8 -> ro 2, 9 -> row 3...
                            const rowStart = (item.schedule.startHour - 8) + 2;
                            const rowSpan = item.schedule.endHour - item.schedule.startHour;

                            return (
                                <div
                                    key={`${item.id}-${dIdx}`}
                                    onClick={() => onClassClick(item)}
                                    className={`m-1 p-2 rounded text-[10px] flex flex-col items-center justify-center text-center font-medium leading-tight border border-emerald-300 bg-emerald-200/50 hover:bg-emerald-200 cursor-pointer transition-colors z-10 hover:z-20`}
                                    style={{
                                        gridColumn: col,
                                        gridRow: `${rowStart} / span ${rowSpan}`
                                    }}
                                >
                                    <span className="font-bold mb-1 text-emerald-900">{item.code}</span>
                                    <span className="mb-1 text-emerald-800">{item.name}</span>
                                    <span className="text-emerald-800">{item.room}</span>
                                </div>
                            );
                        });
                    })}

                </div>
            </div>
        </div>
    );
}
