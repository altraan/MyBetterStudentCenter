"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import ProgressChart from "@/components/academic-progress/progress-chart";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AcademicProgressPage() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center min-h-[500px]">

        <div className={`rounded-3xl p-8 w-full max-w-5xl shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>

          <h2 className={`text-2xl font-bold mb-8 z-10 relative ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Academic Progress Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Chart */}
            <div className="flex justify-center md:justify-end pr-0 md:pr-12">
              <ProgressChart />
            </div>

            {/* Right: Year Buttons */}
            <div className="space-y-4">
              {["Year One Overview", "Year Two Overview", "Year Three Overview", "Year Four Overview"].map((label, i) => (
                <Link href="#" key={i} className="block">
                  <div className={`p-4 rounded-xl flex items-center justify-between shadow-md group transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-900 hover:bg-blue-800 text-white'}`}>
                    <span className="text-lg font-medium">{label}</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>

      </div>
    </HackvilleLayout>
  );
}
