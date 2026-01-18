"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { useAccessibility } from "@/components/AccessibilityContext";
import HackvilleLayout from "@/components/HackvilleLayout";
import PrivacyToggle from "@/components/PrivacyToggle";
import { mockUser, mockAcademicProgress, mockTodaysClasses, mockFinancialSummary, mockDashboardStats } from "@/lib/mock-data";
import { translations } from "@/lib/i18n";
import {
    Calendar,
    ExternalLink
} from "lucide-react";

// Helper component for multi-language captions on key text
function CaptionedText({
    children,
    translationKey
}: {
    children: React.ReactNode;
    translationKey: string;
}) {
    const { multiLangCaptions } = useAccessibility();
    const { language } = useLanguage();

    // Don't show caption if disabled or if already viewing in English or the language is English
    if (!multiLangCaptions || language === 'en') {
        return <>{children}</>;
    }

    // Get the translation in the current language
    const langTranslations = translations[language] as Record<string, string>;
    const translatedText = langTranslations[translationKey];

    return (
        <span className="inline-block">
            {children}
            {translatedText && translatedText !== children && (
                <span className="block text-sm opacity-70 italic font-normal">
                    {translatedText}
                </span>
            )}
        </span>
    );
}

export default function StudentPortal() {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const { highContrast } = useAccessibility();

    return (
        <HackvilleLayout>
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className={`text-2xl font-bold border-b-2 border-blue-900 inline-block pb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <CaptionedText translationKey="serviceHub">{t('serviceHub')}</CaptionedText>
                    </h1>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Today's Schedule - Large Top Left */}
                    <div className={`md:col-span-2 rounded-xl shadow-sm border p-6 h-64 hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-bold flex items-center ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                                <Calendar className="me-2" size={20} />
                                {t('todaysSched')}
                            </h3>
                            <button className="text-blue-400 text-sm font-medium hover:underline">{t('viewSchedule')}</button>
                        </div>
                        {mockTodaysClasses.length > 0 ? (
                            <div className="space-y-2">
                                {mockTodaysClasses.slice(0, 3).map((cls) => (
                                    <div key={cls.id} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{cls.code}</span>
                                                <span className={`mx-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>·</span>
                                                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{cls.name}</span>
                                            </div>
                                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cls.startTime} - {cls.endTime}</span>
                                        </div>
                                        <div className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{cls.room}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40">
                                <p className={`italic ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('noClassesToday')}</p>
                            </div>
                        )}
                    </div>

                    {/* Current GPA - Small Top Right */}
                    <div className={`rounded-xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{t('currentGPA')}</h3>
                        <div className="flex items-center justify-center flex-1">
                            <PrivacyToggle storageKey="gpa" hiddenText="•.••" className={`text-5xl font-black ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>
                                {mockUser.gpa}
                            </PrivacyToggle>
                        </div>
                        <div className={`text-right text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('lastUpdated')}: {mockDashboardStats.todayDate}</div>
                    </div>

                    {/* Academic Progress - Large Middle Left */}
                    <div className={`md:col-span-2 rounded-xl shadow-sm border p-6 h-80 hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{t('academicProgress')}</h3>
                        <div className="flex flex-col md:flex-row items-center justify-around h-full pb-8">
                            {/* Circular Progress */}
                            {/* Circular Progress */}
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className={`stroke-current ${highContrast
                                                ? ''
                                                : (isDarkMode ? 'text-gray-700' : 'text-gray-100')
                                            }`}
                                        stroke={highContrast ? '#9CA3AF' : 'currentColor'}
                                        strokeWidth="10"
                                        cx="50" cy="50" r="40" fill="transparent"
                                    ></circle>
                                    <circle
                                        className={`stroke-current ${highContrast
                                                ? ''
                                                : (isDarkMode ? 'text-blue-500' : 'text-blue-900')
                                            }`}
                                        stroke={highContrast ? '#000000' : 'currentColor'}
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        cx="50" cy="50" r="40" fill="transparent"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={251.2 * (1 - mockAcademicProgress.completionPercentage / 100)}
                                        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                                    ></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-4xl font-bold ${highContrast ? 'text-black' : (isDarkMode ? 'text-white' : 'text-blue-900')
                                        }`}>{mockAcademicProgress.completionPercentage}%</span>
                                    <span className={`text-xs uppercase font-semibold ${highContrast ? 'text-black' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
                                        }`}>{t('percentComplete')}</span>
                                </div>
                            </div>
                            <div className="space-y-2 mt-4 md:mt-0">
                                <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                                    <div
                                        className={`w-3 h-3 rounded-full me-2 ${highContrast
                                                ? ''
                                                : (isDarkMode ? 'bg-blue-500' : 'bg-blue-900')
                                            }`}
                                        style={highContrast ? { backgroundColor: '#000000' } : undefined}
                                    ></div>
                                    <span className={highContrast ? 'font-bold text-black' : ''}>{t('completedCredits')}: {mockAcademicProgress.completedCredits} {t('credits')}</span>
                                </div>
                                <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>
                                    <div
                                        className={`w-3 h-3 rounded-full me-2 ${highContrast
                                                ? ''
                                                : (isDarkMode ? 'bg-gray-600' : 'bg-gray-200')
                                            }`}
                                        style={highContrast ? { backgroundColor: '#9CA3AF' } : undefined}
                                    ></div>
                                    <span className={highContrast ? 'font-medium text-black' : ''}>{t('remainingCredits')}: {(mockAcademicProgress.totalCredits - mockAcademicProgress.completedCredits).toFixed(1)} {t('credits')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Balance - Middle Right */}
                    <div className={`rounded-xl shadow-sm border p-6 flex flex-col justify-between hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{t('accountBalance')}</h3>
                        <div className="flex flex-col items-center justify-center flex-1">
                            <span className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('totalOutstanding')}</span>
                            <PrivacyToggle storageKey="balance" hiddenText="$••••.••" className="text-4xl font-bold text-emerald-500">
                                ${mockFinancialSummary.totalDue.toFixed(2)}
                            </PrivacyToggle>
                        </div>
                        <button className={`w-full py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white'}`}>
                            {t('makePayment')}
                        </button>
                    </div>

                    {/* Financial Overview - Bottom Left/Middle */}
                    <div className={`md:col-span-2 rounded-xl shadow-sm border p-6 h-64 hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{t('financialOverview')}</h3>
                        <div className="space-y-4">
                            <div className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : ''}`}>{t('winterTuition')}</span>
                                <span className={`font-bold ${isDarkMode ? 'text-white' : ''}`}>$4,850.00</span>
                            </div>
                            <div className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : ''}`}>{t('scholarshipsAwards')}</span>
                                <span className="font-bold text-emerald-500">-$2,500.00</span>
                            </div>
                            <div className={`flex justify-between items-center p-3 rounded-lg font-bold border-t ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}>
                                <span>{t('netBalance')}</span>
                                <span>$2,350.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Important Links - Bottom Right */}
                    <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{t('importantLinks')}</h3>
                        <ul className="space-y-3">
                            {[
                                { label: t('bookstore'), href: "https://www.sheridancollege.ca/student-life/campus-services/campus-store" },
                                { label: t('libraryResources'), href: "https://www.sheridancollege.ca/student-life/student-services/library-services" },
                                { label: t('itSupport'), href: "https://sheridancollege.service-now.com" },
                                { label: t('campusMap'), href: "https://www.sheridancollege.ca/-/media/project/sheridan/shared/files/about/campus-locations/campus-map-trafalgar.pdf" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <a href={link.href}
                                        target="_blank"             // Opens in new tab
                                        rel="noopener noreferrer"   // Security best practice
                                        className="flex items-center justify-between text-sm text-gray-700 
                                        hover:text-blue-700 hover:bg-blue-50 
                                        px-3 py-2 rounded-lg group transition-all duration-200">
                                        <span>{link.label}</span>
                                        <ExternalLink
                                            size={14}
                                            className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </HackvilleLayout>
    );
}
