"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import ProgressChart from "@/components/academic-progress/progress-chart";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AcademicProgressPage() {
  const { t } = useLanguage();

  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center min-h-[500px]">

        <div className="bg-gray-200 rounded-3xl p-8 w-full max-w-5xl shadow-sm relative overflow-hidden">

          <h2 className="text-2xl font-bold text-blue-900 mb-8 z-10 relative">Academic Progress Orverview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left: Chart */}
            <div className="flex justify-center md:justify-end pr-0 md:pr-12">
              <ProgressChart />
            </div>

            {/* Right: Year Buttons */}
            <div className="space-y-4">
              {["Year One Overview", "Year Two Overview", "Year Three Overview", "Year Four Overview"].map((label, i) => (
                <Link href="#" key={i} className="block">
                  <div className="bg-blue-900 hover:bg-blue-800 transition-colors text-white p-4 rounded-xl flex items-center justify-between shadow-md group">
                    <span className="text-lg font-medium">{label}</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>

        {/* Floating Star Icon (Decor) */}
        <div className="fixed bottom-8 right-8 text-white bg-blue-900 p-4 rounded-full shadow-lg z-50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

      </div>
    </HackvilleLayout>
  );
}
