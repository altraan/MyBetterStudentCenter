"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HackvilleHeader from "@/components/HackvilleHeader";
import { useLanguage } from "@/components/LanguageContext";
import {
    LayoutDashboard,
    GraduationCap,
    DollarSign,
    Users,
    Link as LinkIcon,
    Calendar,
    ChevronRight,
    ChevronLeft,
    ExternalLink,
    Menu,
    BookOpen,
    TrendingUp
} from "lucide-react";
import HackvilleAIChat from "@/components/ai/HackvilleAIChat";

export default function StudentPortal() {
    const { t, language } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { 
            icon: LayoutDashboard, 
            label: t('serviceHub'), 
            href: "/",
            subItems: []
        },
        { 
            icon: GraduationCap, 
            label: t('academics'), 
            href: "/academic",
            subItems: [
                { icon: BookOpen, label: t('academicRecords'), href: "/academic-records" },
                { icon: TrendingUp, label: t('academicProgress'), href: "/academic-progress" },
                { icon: Calendar, label: t('manageClasses'), href: "/manage-classes" },
            ]
        },
        { 
            icon: DollarSign, 
            label: t('finances'), 
            href: "/financial",
            subItems: []
        },
        { 
            icon: Users, 
            label: t('studentServices'), 
            href: "/student-services",
            subItems: []
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative">
            <HackvilleHeader />

            <div className="flex flex-1 pt-16">
                {/* Side Navigation */}
                <aside
                    className={`
                        ${isExpanded ? 'w-64' : 'w-20'} 
                        bg-blue-900 text-white flex flex-col fixed h-full z-40 transition-all duration-300 ease-in-out shadow-xl
                    `}
                >
                    {/* Toggle Button */}
                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-1 hover:bg-blue-800 rounded-md transition-colors"
                        >
                            {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    <nav className="flex-1 mt-2">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                            const IconComponent = item.icon;
                            
                            return (
                                <div key={index}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            w-full flex items-center p-4 hover:bg-blue-800 transition-colors 
                                            ${isActive ? 'bg-blue-800 border-s-4 border-white' : ''}
                                            ${!isExpanded ? 'justify-center' : ''}
                                        `}
                                    >
                                        <span className={isExpanded ? 'me-4' : ''}>
                                            <IconComponent size={20} />
                                        </span>
                                        {isExpanded && <span className="font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2">{item.label}</span>}
                                    </Link>
                                    {/* Sub-items for Academics */}
                                    {isExpanded && item.subItems && item.subItems.length > 0 && isActive && (
                                        <div className="ms-4 space-y-1">
                                            {item.subItems.map((subItem, subIndex) => {
                                                const SubIconComponent = subItem.icon;
                                                const isSubActive = pathname === subItem.href;
                                                return (
                                                    <Link
                                                        key={subIndex}
                                                        href={subItem.href}
                                                        className={`
                                                            flex items-center p-3 rounded-md hover:bg-blue-800 transition-colors
                                                            ${isSubActive ? 'bg-blue-800' : ''}
                                                        `}
                                                    >
                                                        <SubIconComponent size={18} className="me-3" />
                                                        <span className="text-sm font-medium">{subItem.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main
                    className={`
                        flex-1 
                        ${isExpanded ? 'ms-64' : 'ms-20'} 
                        p-4 md:p-8 transition-all duration-300 ease-in-out
                    `}
                >
                    <div className="max-w-7xl mx-auto">
                        <header className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-900 inline-block pb-1">
                                {t('serviceHub')}
                            </h1>
                        </header>

                        {/* Dashboard Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Today's Schedule - Large Top Left */}
                            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-blue-900 flex items-center">
                                        <Calendar className="me-2" size={20} />
                                        {t('todaysSched')}
                                    </h3>
                                    <button className="text-blue-600 text-sm font-medium hover:underline">{t('viewSchedule')}</button>
                                </div>
                                <div className="space-y-3 opacity-60 flex flex-col items-center justify-center h-40">
                                    <p className="text-gray-500 italic">{t('noClassesToday')}</p>
                                </div>
                            </div>

                            {/* Current GPA - Small Top Right */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-blue-900">{t('currentGPA')}</h3>
                                <div className="flex items-center justify-center flex-1">
                                    <span className="text-5xl font-black text-blue-900">3.85</span>
                                </div>
                                <div className="text-right text-xs text-gray-500">{t('lastUpdated')}: Jan 15, 2026</div>
                            </div>

                            {/* Academic Progress - Large Middle Left */}
                            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-80 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-blue-900 mb-4">{t('academicProgress')}</h3>
                                <div className="flex flex-col md:flex-row items-center justify-around h-full pb-8">
                                    {/* Circular Progress */}
                                    <div className="relative w-48 h-48">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle
                                                className="text-gray-100 stroke-current"
                                                strokeWidth="10"
                                                cx="50" cy="50" r="40" fill="transparent"
                                            ></circle>
                                            <circle
                                                className="text-blue-900 stroke-current"
                                                strokeWidth="10"
                                                strokeLinecap="round"
                                                cx="50" cy="50" r="40" fill="transparent"
                                                strokeDasharray="251.2"
                                                strokeDashoffset={251.2 * (1 - 0.51)}
                                            ></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-bold text-blue-900">51%</span>
                                            <span className="text-xs text-gray-500 uppercase font-semibold">{t('percentComplete')}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-4 md:mt-0">
                                        <div className="flex items-center text-sm">
                                            <div className="w-3 h-3 bg-blue-900 rounded-full me-2"></div>
                                            <span>{t('completedCredits')}: 61.2 Credits</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <div className="w-3 h-3 bg-gray-200 rounded-full me-2"></div>
                                            <span>{t('remainingCredits')}: 58.8 Credits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Balance - Middle Right */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-blue-900">{t('accountBalance')}</h3>
                                <div className="flex flex-col items-center justify-center flex-1">
                                    <span className="text-sm text-gray-500 mb-1">{t('totalOutstanding')}</span>
                                    <span className="text-4xl font-bold text-emerald-600">$1,240.50</span>
                                </div>
                                <button className="w-full bg-blue-900 text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                                    {t('makePayment')}
                                </button>
                            </div>

                            {/* Financial Overview - Bottom Left/Middle */}
                            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-blue-900 mb-4">{t('financialOverview')}</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium">{t('winterTuition')}</span>
                                        <span className="font-bold">$4,850.00</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium">{t('scholarshipsAwards')}</span>
                                        <span className="font-bold text-emerald-600">-$2,500.00</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg font-bold border-t border-gray-200">
                                        <span>{t('netBalance')}</span>
                                        <span>$2,350.00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Important Links - Bottom Right */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-blue-900 mb-4">{t('importantLinks')}</h3>
                                <ul className="space-y-3">
                                    {[
                                        { label: t('bookstore'), href: "#" },
                                        { label: t('libraryResources'), href: "#" },
                                        { label: t('itSupport'), href: "#" },
                                        { label: t('campusMap'), href: "#" }
                                    ].map((link, i) => (
                                        <li key={i}>
                                            <a href={link.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 group transition-colors">
                                                <span>{link.label}</span>
                                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </main>
            </div>

            {/* AI Chat Assistant */}
            <HackvilleAIChat />
        </div>
    );
}
