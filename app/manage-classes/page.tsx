"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import WeeklySchedule from "@/components/manage-classes/weekly-schedule";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ManageClassesPage() {
  const { t } = useLanguage();

  return (
    <HackvilleLayout>
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule - Span 2 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-blue-900">Today&apos;s Schedule</h2>
              <Link href="#" className="text-blue-700 text-sm font-medium hover:underline flex items-center">
                Full Schedule <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {/* Class One */}
              <div className="bg-gray-300 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-gray-400">
                <div className="flex flex-col mb-2 md:mb-0">
                  <span className="text-xl font-bold text-blue-900">DESN</span>
                  <span className="text-xl font-bold text-blue-900">2143</span>
                </div>
                <div className="flex-1 md:mx-8">
                  <h3 className="font-bold text-blue-900 text-lg">Class One</h3>
                  <p className="text-blue-900 text-sm">Prof. John Doe</p>
                </div>
                <div className="flex flex-col md:items-end text-xs font-bold text-blue-900 mt-2 md:mt-0">
                  <span>9:00 AM - 12:00 PM</span>
                  <span className="mt-1">Room J212</span>
                </div>
              </div>

              {/* Class Two */}
              <div className="bg-gray-300 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-gray-400">
                <div className="flex flex-col mb-2 md:mb-0">
                  <span className="text-xl font-bold text-blue-900">DESN</span>
                  <span className="text-xl font-bold text-blue-900">2314</span>
                </div>
                <div className="flex-1 md:mx-8">
                  <h3 className="font-bold text-blue-900 text-lg">Class Two</h3>
                  <p className="text-blue-900 text-sm">Prof. John Doe</p>
                </div>
                <div className="flex flex-col md:items-end text-xs font-bold text-blue-900 mt-2 md:mt-0">
                  <span>12:00 PM - 1:00 PM</span>
                  <span className="mt-1">Room J222</span>
                </div>
              </div>

              {/* Class Three */}
              <div className="bg-gray-300 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between shadow-sm border border-gray-400">
                <div className="flex flex-col mb-2 md:mb-0">
                  <span className="text-xl font-bold text-blue-900">VDES</span>
                  <span className="text-xl font-bold text-blue-900">2431</span>
                </div>
                <div className="flex-1 md:mx-8">
                  <h3 className="font-bold text-blue-900 text-lg">Class Three</h3>
                  <p className="text-blue-900 text-sm">Prof. John Doe</p>
                </div>
                <div className="flex flex-col md:items-end text-xs font-bold text-blue-900 mt-2 md:mt-0">
                  <span>2:00 PM - 4:00 PM</span>
                  <span className="mt-1">Room J216</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions - Span 1 */}
          <div className="space-y-6 flex flex-col justify-center">
            <Link href="#" className="block group">
              <div className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-xl p-8 flex items-center justify-between shadow-sm h-32">
                <span className="text-xl font-bold text-blue-900">Swap Classes</span>
                <ChevronRight className="text-blue-900 group-hover:translate-x-1 transition-transform" size={32} />
              </div>
            </Link>

            <Link href="#" className="block group">
              <div className="bg-gray-200 hover:bg-gray-300 transition-colors rounded-xl p-8 flex items-center justify-between shadow-sm h-32">
                <span className="text-xl font-bold text-blue-900">Drop Classes</span>
                <ChevronRight className="text-blue-900 group-hover:translate-x-1 transition-transform" size={32} />
              </div>
            </Link>
          </div>
        </div>

        {/* Weekly Schedule Grid */}
        <WeeklySchedule />

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
