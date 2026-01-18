// Mock Data Store for Demo
// This file contains all mock data for the student portal

export interface Course {
    id: string;
    code: string;
    name: string;
    description: string;
    professor: string;
    credits: number;
    type: 'core' | 'elective';
    prerequisites: string[];
    seats: { available: number; total: number };
    schedule: {
        days: number[]; // 0=Monday, 1=Tuesday, etc.
        startHour: number;
        endHour: number;
        room: string;
    };
}

export interface EnrolledClass {
    id: string;
    code: string;
    name: string;
    professor: string;
    startTime: string;
    endTime: string;
    room: string;
    schedule: {
        days: number[];
        startHour: number;
        endHour: number;
    };
}

export const mockUser = {
    id: "100293847",
    name: "Alex Student",
    email: "alex.student@sheridancollege.ca",
    program: "Honours Bachelor of Interaction Design",
    year: 3,
    gpa: 3.85,
    avatar: null,
};

export const mockAcademicProgress = {
    completedCredits: 61.2,
    totalCredits: 120,
    completionPercentage: 51,
    yearsCompleted: 2,
    totalYears: 4,
};

// Currently enrolled classes for Winter 2026
export const mockEnrolledClasses: EnrolledClass[] = [
    {
        id: "enrolled-1",
        code: "DESN 4001",
        name: "Capstone Project",
        professor: "Prof. Sarah Chen",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        room: "Room J212",
        schedule: { days: [0, 2], startHour: 9, endHour: 12 }, // Mon, Wed
    },
    {
        id: "enrolled-2",
        code: "DESN 4002",
        name: "Advanced Interaction",
        professor: "Prof. Michael Lee",
        startTime: "1:00 PM",
        endTime: "3:00 PM",
        room: "Room J220",
        schedule: { days: [1, 3], startHour: 13, endHour: 15 }, // Tue, Thu
    },
    {
        id: "enrolled-3",
        code: "DESN 4003",
        name: "Portfolio Development",
        professor: "Prof. Emma Wilson",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        room: "Room J216",
        schedule: { days: [4], startHour: 10, endHour: 12 }, // Fri
    },
];

// Today's schedule (Saturday = no classes, but let's pretend it's Monday)
export const mockTodaysClasses = mockEnrolledClasses.filter(c =>
    c.schedule.days.includes(0) // Monday
);

// Available courses to add (for course browser)
export const mockAvailableCourses: Course[] = [
    // Core Courses
    {
        id: "avail-1",
        code: "DESN 4004",
        name: "Design Systems",
        description: "Learn to create and maintain scalable design systems for enterprise applications. Covers component libraries, documentation, and cross-team collaboration.",
        professor: "Prof. James Park",
        credits: 3,
        type: "core",
        prerequisites: ["DESN 3001", "DESN 3002"],
        seats: { available: 8, total: 25 },
        schedule: { days: [0, 2], startHour: 14, endHour: 16, room: "Room J218" }, // Mon, Wed 2-4PM
    },
    {
        id: "avail-2",
        code: "DESN 4005",
        name: "Design Leadership",
        description: "Develop leadership skills for design teams. Topics include stakeholder management, design operations, and strategic planning.",
        professor: "Prof. Maria Santos",
        credits: 3,
        type: "core",
        prerequisites: ["DESN 3003"],
        seats: { available: 12, total: 20 },
        schedule: { days: [1, 3], startHour: 10, endHour: 12, room: "Room J222" }, // Tue, Thu 10AM-12PM
    },
    {
        id: "avail-3",
        code: "DESN 4006",
        name: "Accessibility Design",
        description: "Deep dive into accessible design principles, WCAG guidelines, and inclusive design practices.",
        professor: "Prof. David Kim",
        credits: 3,
        type: "core",
        prerequisites: ["DESN 2001"],
        seats: { available: 5, total: 22 },
        schedule: { days: [4], startHour: 13, endHour: 16, room: "Room J212" }, // Fri 1-4PM
    },
    {
        id: "avail-4",
        code: "DESN 4007",
        name: "Motion Design",
        description: "Learn animation principles for UI/UX. Create engaging micro-interactions and transitions using modern tools.",
        professor: "Prof. Lisa Chen",
        credits: 3,
        type: "core",
        prerequisites: ["DESN 2002"],
        seats: { available: 0, total: 20 },
        schedule: { days: [0, 2], startHour: 9, endHour: 11, room: "Room J214" }, // CONFLICT: Mon, Wed 9-11AM
    },

    // Elective Courses
    {
        id: "avail-5",
        code: "BUSN 3001",
        name: "Entrepreneurship",
        description: "Launch your own design business. Learn about business models, funding, and startup operations.",
        professor: "Prof. Robert Brown",
        credits: 3,
        type: "elective",
        prerequisites: [],
        seats: { available: 15, total: 30 },
        schedule: { days: [1], startHour: 16, endHour: 19, room: "Room B102" }, // Tue 4-7PM
    },
    {
        id: "avail-6",
        code: "PSYC 2001",
        name: "Cognitive Psychology",
        description: "Understand how users think and process information. Essential for designing intuitive interfaces.",
        professor: "Prof. Amanda White",
        credits: 3,
        type: "elective",
        prerequisites: ["PSYC 1001"],
        seats: { available: 20, total: 35 },
        schedule: { days: [2, 4], startHour: 14, endHour: 16, room: "Room C210" }, // Wed, Fri 2-4PM
    },
    {
        id: "avail-7",
        code: "COMP 2501",
        name: "Web Development II",
        description: "Advanced web development with React, Next.js, and modern CSS frameworks.",
        professor: "Prof. Kevin Zhang",
        credits: 3,
        type: "elective",
        prerequisites: ["COMP 1501"],
        seats: { available: 3, total: 25 },
        schedule: { days: [0, 3], startHour: 15, endHour: 17, room: "Room D305" }, // Mon, Thu 3-5PM
    },
    {
        id: "avail-8",
        code: "ARTS 2001",
        name: "Digital Illustration",
        description: "Master digital illustration techniques using industry-standard tools like Procreate and Illustrator.",
        professor: "Prof. Nina Rodriguez",
        credits: 3,
        type: "elective",
        prerequisites: [],
        seats: { available: 7, total: 18 },
        schedule: { days: [1, 3], startHour: 13, endHour: 15, room: "Room A101" }, // CONFLICT: Tue, Thu 1-3PM
    },
    {
        id: "avail-9",
        code: "MKTG 2001",
        name: "Digital Marketing",
        description: "Learn SEO, social media marketing, and analytics for promoting design work.",
        professor: "Prof. Chris Taylor",
        credits: 3,
        type: "elective",
        prerequisites: [],
        seats: { available: 22, total: 40 },
        schedule: { days: [2], startHour: 9, endHour: 12, room: "Room B205" }, // Wed 9AM-12PM
    },
    {
        id: "avail-10",
        code: "FILM 1501",
        name: "Video Production",
        description: "Create compelling video content. Learn filming, editing, and post-production.",
        professor: "Prof. Alex Turner",
        credits: 3,
        type: "elective",
        prerequisites: [],
        seats: { available: 10, total: 20 },
        schedule: { days: [4], startHour: 9, endHour: 12, room: "Room M110" }, // Fri 9AM-12PM
    },
];

// Helper function to check schedule conflicts
export function hasScheduleConflict(course: Course, enrolledClasses: EnrolledClass[]): boolean {
    for (const enrolled of enrolledClasses) {
        // Check if any days overlap
        const overlappingDays = course.schedule.days.filter(d => enrolled.schedule.days.includes(d));
        if (overlappingDays.length > 0) {
            // Check if times overlap
            const courseStart = course.schedule.startHour;
            const courseEnd = course.schedule.endHour;
            const enrolledStart = enrolled.schedule.startHour;
            const enrolledEnd = enrolled.schedule.endHour;

            if (courseStart < enrolledEnd && courseEnd > enrolledStart) {
                return true;
            }
        }
    }
    return false;
}

// Format schedule for display
export function formatSchedule(schedule: { days: number[]; startHour: number; endHour: number; room: string }): string {
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const days = schedule.days.map(d => dayNames[d]).join(', ');
    const formatHour = (h: number) => {
        const period = h >= 12 ? 'PM' : 'AM';
        const hour = h > 12 ? h - 12 : h;
        return `${hour}:00 ${period}`;
    };
    return `${days} ${formatHour(schedule.startHour)} - ${formatHour(schedule.endHour)}`;
}

export const mockWeeklySchedule = mockEnrolledClasses.map((cls, idx) => ({
    id: cls.id,
    code: cls.code,
    name: cls.name.split(' ').slice(0, 2).join(' '),
    time: `${cls.startTime}-${cls.endTime}`,
    room: cls.room,
    dayIndex: cls.schedule.days[0],
    startHour: cls.schedule.startHour,
    durationHours: cls.schedule.endHour - cls.schedule.startHour,
    color: ['bg-blue-200/60', 'bg-emerald-200/60', 'bg-purple-200/60'][idx % 3],
}));

export const mockFinancialSummary = {
    totalDue: 0.0,
    currency: "CAD",
    terms: [
        { term: "Winter 2026", balance: -81.97 },
        { term: "Fall 2025", balance: 0.0 },
        { term: "Winter 2025", balance: 0.0 },
        { term: "Fall 2024", balance: 0.0 },
    ],
    overallBalance: -81.97,
};

export const mockReceipts = [
    { id: "1", date: "01/09/2026", time: "10:12:17AM", type: "Stdnt Pymt", amount: 4580.14, receiptNumber: "2764247" },
    { id: "2", date: "09/16/2025", time: "4:44:01PM", type: "Stdnt Pymt", amount: 4021.22, receiptNumber: "2717635" },
    { id: "3", date: "07/03/2025", time: "11:21:42AM", type: "Stdnt Pymt", amount: 250.0, receiptNumber: "2676641" },
    { id: "4", date: "12/16/2024", time: "10:53:15AM", type: "Stdnt Pymt", amount: 4404.25, receiptNumber: "2592923" },
    { id: "5", date: "07/19/2024", time: "10:24:59AM", type: "Stdnt Pymt", amount: 4748.78, receiptNumber: "2524646" },
];

export const mockCourseHistory = [
    { id: "1", name: "Design Fundamentals", term: "Fall 2024", grade: "A" },
    { id: "2", name: "Digital Tools", term: "Fall 2024", grade: "A-" },
    { id: "3", name: "Communications", term: "Fall 2024", grade: "B+" },
    { id: "4", name: "Math for Design", term: "Fall 2024", grade: "A" },
    { id: "5", name: "UX Design I", term: "Winter 2025", grade: "B+" },
    { id: "6", name: "Visual Design", term: "Winter 2025", grade: "A-" },
    { id: "7", name: "Prototyping", term: "Winter 2025", grade: "A" },
    { id: "8", name: "Intro Psychology", term: "Winter 2025", grade: "B" },
];

export const mockGradesByTerm = {
    "Fall 2024": [
        { course: "DESN 1001", name: "Design Fundamentals", grade: "A", credits: 3 },
        { course: "DESN 1002", name: "Digital Tools", grade: "A-", credits: 3 },
        { course: "COMM 1001", name: "Communications", grade: "B+", credits: 3 },
        { course: "MATH 1001", name: "Math for Design", grade: "A", credits: 3 },
    ],
    "Winter 2025": [
        { course: "DESN 2001", name: "UX Design I", grade: "A", credits: 3 },
        { course: "DESN 2002", name: "Visual Design", grade: "A-", credits: 3 },
        { course: "DESN 2003", name: "Prototyping", grade: "B+", credits: 3 },
        { course: "PSYC 1001", name: "Intro Psychology", grade: "A", credits: 3 },
    ],
    "Fall 2025": [
        { course: "DESN 3001", name: "UX Design II", grade: "A", credits: 3 },
        { course: "DESN 3002", name: "UI Engineering", grade: "A-", credits: 3 },
        { course: "DESN 3003", name: "Design Research", grade: "A", credits: 3 },
        { course: "BUSN 2001", name: "Business Strategy", grade: "B+", credits: 3 },
    ],
    "Winter 2026": [
        { course: "DESN 4001", name: "Capstone Project", grade: "In Progress", credits: 6 },
        { course: "DESN 4002", name: "Advanced Interaction", grade: "In Progress", credits: 3 },
        { course: "DESN 4003", name: "Portfolio Development", grade: "In Progress", credits: 3 },
    ],
};

export const mockDashboardStats = {
    todayDate: "January 18, 2026",
    upcomingDeadlines: [
        { id: "1", title: "Capstone Milestone 2", dueDate: "Jan 25, 2026", course: "DESN 4001" },
        { id: "2", title: "Portfolio Draft", dueDate: "Jan 30, 2026", course: "DESN 4003" },
        { id: "3", title: "Interaction Prototype", dueDate: "Feb 5, 2026", course: "DESN 4002" },
    ],
    announcements: [
        { id: "1", title: "Winter 2026 Fee Deadline", date: "Jan 20, 2026", priority: "high" },
        { id: "2", title: "Career Fair Registration Open", date: "Feb 1, 2026", priority: "medium" },
        { id: "3", title: "Reading Week: Feb 17-21", date: "Feb 17, 2026", priority: "low" },
    ],
};
