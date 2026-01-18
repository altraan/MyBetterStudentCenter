"use client";

const days = ["Monday\nJan 12", "Tuesday\nJan 13", "Wednesday\nJan 14", "Thursday\nJan 15", "Friday\nJan 16"];
const hours = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM"];

// Grid configuration: 
// Columns: Time Label + 5 Days
// Rows: Header + 6 Hours

const scheduleItems = [
    {
        title: "DESN 22848\nLaboratory",
        time: "8:00 AM-2:00 PM",
        room: "Room: TR...",
        col: 6, // Friday is 5th day -> col index 6 (1-based, 1 is time)
        rowStart: 2, // 8AM is row 2 (row 1 is header)
        rowSpan: 6,
        color: "bg-emerald-200/50 hover:bg-emerald-200"
    },
    {
        title: "DESN 20102\nLaboratory",
        time: "12:00 PM-3:00 PM",
        room: "Room: TRA-J220",
        col: 3, // Tuesday is 2nd day -> col index 3
        rowStart: 6, // 12PM is row 6
        rowSpan: 3, // extends past view? well 12-3 is 3 hours. view is 8-1. 
        color: "bg-emerald-200/50 hover:bg-emerald-200"
    },
    {
        title: "DESN 10799 Lecture",
        time: "1:00 PM-2:00 PM",
        room: "Room: VTL-VTL",
        col: 4, // Wednesday is 3rd day -> col index 4
        rowStart: 7, // 1PM is row 7
        rowSpan: 1,
        color: "bg-emerald-200/50 hover:bg-emerald-200"
    }
];

export default function WeeklySchedule() {
    return (
        <div className="bg-gray-200 p-1 rounded-sm shadow-sm">
            {/* Header */}
            <div className="bg-gray-200 p-2 border-b border-gray-300">
                <h2 className="text-xl font-bold text-blue-900">Calendar View</h2>
            </div>

            <div className="bg-white overflow-x-auto">
                <div className="min-w-[800px] grid grid-cols-[80px_repeat(5,1fr)] auto-rows-[80px] text-xs">

                    {/* Header Row */}
                    <div className="border-b border-r border-gray-300 p-2 font-bold text-gray-900 h-16 flex items-end">Time</div>
                    {days.map((day, i) => (
                        <div key={i} className="border-b border-r border-gray-300 p-2 font-bold text-center whitespace-pre-line flex items-center justify-center h-16 text-gray-900">
                            {day}
                        </div>
                    ))}

                    {/* Grid Cells (Background) */}
                    {hours.map((time, r) => (
                        <>
                            <div key={`time-${r}`} className="border-b border-r border-gray-300 p-2 text-gray-500 font-medium sticky left-0 bg-white z-10" style={{ gridRow: r + 2, gridColumn: 1 }}>
                                {time}
                            </div>
                            {Array.from({ length: 5 }).map((_, c) => (
                                <div key={`cell-${r}-${c}`} className="border-b border-r border-gray-300" style={{ gridRow: r + 2, gridColumn: c + 2 }}></div>
                            ))}
                        </>
                    ))}

                    {/* Schedule Items (Overlay) */}
                    {scheduleItems.map((item, i) => (
                        <div
                            key={i}
                            className={`m-1 p-2 rounded text-[10px] flex flex-col items-center justify-center text-center font-medium leading-tight border border-emerald-300 ${item.color} cursor-pointer transition-colors z-20`}
                            style={{
                                gridColumn: item.col,
                                gridRow: `${item.rowStart} / span ${item.rowSpan}`
                            }}
                        >
                            <span className="font-bold mb-1">{item.title}</span>
                            <span className="mb-1">{item.time}</span>
                            <span>{item.room}</span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}