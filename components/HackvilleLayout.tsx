"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HackvilleHeader from "@/components/HackvilleHeader";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
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

    Menu,
    ChevronLeft
} from "lucide-react";
import HackvilleAIChat from "@/components/ai/HackvilleAIChat";

interface HackvilleLayoutProps {
    children: React.ReactNode;
}

export default function HackvilleLayout({ children }: HackvilleLayoutProps) {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();


    const navItems = [
        {
            icon: Home,
            label: "dashboard",
            href: "/"
        },
        {
            icon: BookOpen,
            label: "academicRecords",
            href: "/academic-records"
        },
        {
            icon: TrendingUp,
            label: "academicProgress",
            href: "/academic-progress"
        },
        {
            icon: Calendar,
            label: "manageClasses",
            href: "/manage-classes"
        },
        {
            icon: DollarSign,
            label: "finances",
            href: "/financial"
        },
        {
            icon: GraduationCap,
            label: "creditTransfer",
            href: "/credit-transfers"
        },
        {
            icon: FileText,
            label: "registrationStatus",
            href: "/registration-status"
        },
        {
            icon: Headphones,
            label: "studentServices",
            href: "/student-services"
        },
        {
            icon: HelpCircle,
            label: "serviceRequests",
            href: "/service-requests"
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
                                <Link
                                    key={index}
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
                                </Link>
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
