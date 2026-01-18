// Mock Data Store for Demo
// This file contains all mock data for the student portal

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

export const mockTodaysClasses = [
    {
        id: "1",
        code: "DESN 2143",
        name: "Class One",
        professor: "Prof. John Doe",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        room: "Room J212",
    },
    {
        id: "2",
        code: "DESN 2314",
        name: "Class Two",
        professor: "Prof. John Doe",
        startTime: "12:00 PM",
        endTime: "1:00 PM",
        room: "Room J222",
    },
    {
        id: "3",
        code: "VDES 2431",
        name: "Class Three",
        professor: "Prof. John Doe",
        startTime: "2:00 PM",
        endTime: "4:00 PM",
        room: "Room J216",
    },
];

export const mockWeeklySchedule = [
    {
        id: "1",
        code: "DESN 22848",
        name: "Laboratory",
        time: "8:00 AM-2:00 PM",
        room: "Room: TRA-J220",
        dayIndex: 4, // Friday (0=Monday)
        startHour: 8,
        durationHours: 6,
    },
    {
        id: "2",
        code: "DESN 20102",
        name: "Laboratory",
        time: "12:00 PM-3:00 PM",
        room: "Room: TRA-J220",
        dayIndex: 1, // Tuesday
        startHour: 12,
        durationHours: 3,
    },
    {
        id: "3",
        code: "DESN 10799",
        name: "Lecture",
        time: "1:00 PM-2:00 PM",
        room: "Room: VTL-VTL",
        dayIndex: 2, // Wednesday
        startHour: 13,
        durationHours: 1,
    },
];

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
    { id: "1", name: "Course One", term: "Fall 2024", grade: "A" },
    { id: "2", name: "Course Two", term: "Fall 2024", grade: "A-" },
    { id: "3", name: "Course Three", term: "Fall 2024", grade: "B+" },
    { id: "4", name: "Course Four", term: "Fall 2024", grade: "A" },
    { id: "5", name: "Course Five", term: "Winter 2025", grade: "B+" },
    { id: "6", name: "Course Six", term: "Winter 2025", grade: "A-" },
    { id: "7", name: "Course Seven", term: "Winter 2025", grade: "A" },
    { id: "8", name: "Course Eight", term: "Winter 2025", grade: "B" },
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
    ],
    announcements: [
        { id: "1", title: "Winter 2026 Fee Deadline", date: "Jan 20, 2026", priority: "high" },
        { id: "2", title: "Career Fair Registration Open", date: "Feb 1, 2026", priority: "medium" },
    ],
};
