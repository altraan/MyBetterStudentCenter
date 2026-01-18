"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HackvilleHeader from "@/components/HackvilleHeader";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { useAccessibility } from "@/components/AccessibilityContext";
import {
    Home,
    BookOpen,
    TrendingUp,
    Calendar,
    DollarSign,
    GraduationCap,
    FileText,
    Headphones,
    HelpCircle,
    Accessibility,

    Menu,
    ChevronLeft,
    Info
} from "lucide-react";
import HackvilleAIChat from "@/components/ai/HackvilleAIChat";

interface HackvilleLayoutProps {
    children: React.ReactNode;
}

export default function HackvilleLayout({ children }: HackvilleLayoutProps) {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const { stepByStepGuidance } = useAccessibility();
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();


    const navItems = [
        {
            icon: Home,
            label: "dashboard",
            href: "/",
            guidance: "Click here to go to your home page. See your schedule, GPA, and quick links."
        },
        {
            icon: BookOpen,
            label: "academicRecords",
            href: "/academic-records",
            guidance: "View your grades, transcripts, and course history here."
        },
        {
            icon: TrendingUp,
            label: "academicProgress",
            href: "/academic-progress",
            guidance: "Track how many credits you've completed toward your degree."
        },
        {
            icon: Calendar,
            label: "manageClasses",
            href: "/manage-classes",
            guidance: "Add or drop classes and view your weekly schedule here."
        },
        {
            icon: DollarSign,
            label: "finances",
            href: "/financial",
            guidance: "View your tuition balance, make payments, and see financial aid."
        },
        {
            icon: GraduationCap,
            label: "creditTransfer",
            href: "/credit-transfers",
            guidance: "Check status of credits transferred from other schools."
        },
        {
            icon: FileText,
            label: "registrationStatus",
            href: "/registration-status",
            guidance: "See your enrollment status and any holds on your account."
        },
        {
            icon: Headphones,
            label: "studentServices",
            href: "/student-services",
            guidance: "Access counseling, career services, and health resources."
        },
        {
            icon: HelpCircle,
            label: "serviceRequests",
            href: "/service-requests",
            guidance: "Submit requests for transcripts, letters, and other services."
        },
    ];

    return (
        <div className={`min-h-screen flex flex-col relative transition-colors ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <HackvilleHeader />

            <div className="flex flex-1 pt-16">
                {/* Side Navigation - Expandable */}
                <aside className={`
                    ${isExpanded ? 'w-64' : 'w-20'} 
                    ${isDarkMode ? 'bg-gray-900' : 'bg-blue-900'} text-white flex flex-col fixed h-full z-40 shadow-xl transition-all duration-300 ease-in-out
                `}>
                    {/* Toggle Button */}
                    <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-blue-800'} flex items-center justify-end`}>
                        {isExpanded ? (
                            <button
                                onClick={() => setIsExpanded(false)}
                                className={`p-1 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-800'} rounded-md transition-colors`}
                                title="Collapse menu"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsExpanded(true)}
                                className={`p-1 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-800'} rounded-md transition-colors w-full flex justify-center`}
                                title="Expand menu"
                            >
                                <Menu size={20} />
                            </button>
                        )}
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            const IconComponent = item.icon;

                            return (
                                <div key={index} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={`
                                            w-full flex items-center p-4 transition-colors 
                                            ${isActive
                                                ? (isDarkMode ? 'bg-gray-800 text-white border-s-4 border-blue-500' : 'bg-white text-blue-900 border-s-4 border-blue-900')
                                                : (isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-white hover:bg-blue-800')}
                                            ${!isExpanded ? 'justify-center' : ''}
                                        `}
                                        title={!isExpanded ? item.label : undefined}
                                    >
                                        <IconComponent size={20} className={isExpanded ? 'me-4' : ''} />
                                        {isExpanded && <span className="font-medium whitespace-nowrap">{t(item.label as any) || item.label}</span>}
                                        {/* Step-by-step guidance indicator */}
                                        {stepByStepGuidance && isExpanded && (
                                            <Info size={14} className="ms-auto text-blue-300 opacity-75" />
                                        )}
                                    </Link>
                                    {/* Guidance tooltip on hover when step-by-step mode is enabled */}
                                    {stepByStepGuidance && (
                                        <div className={`
                                            absolute left-full top-1/2 -translate-y-1/2 ml-2 
                                            bg-blue-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg
                                            max-w-xs whitespace-normal opacity-0 invisible
                                            group-hover:opacity-100 group-hover:visible
                                            transition-all duration-200 z-50
                                        `}>
                                            {item.guidance}
                                            {/* Arrow */}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-blue-600" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className={`
                    flex-1 
                    ${isExpanded ? 'ms-64' : 'ms-20'} 
                    p-4 md:p-8 transition-all duration-300 ease-in-out
                `}>
                    {children}
                </main>
            </div>

            {/* AI Chat Assistant */}
            <HackvilleAIChat />
        </div>
    );
}
