"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function AcademicRecordsPage() {
  const { t } = useLanguage();

  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Course History Section */}
        <div className="bg-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-900">Course History</h2>
            <ChevronRight className="text-blue-900" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Course One", "Course Two", "Course Three", "Course Four",
              "Course Five", "Course Six", "Course Seven", "Course Eight"
            ].map((course, i) => (
              <div key={i} className="bg-blue-900 text-white rounded-lg p-3 px-6 text-center shadow-sm font-medium">
                {course}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Three Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* View Grades */}
          <div className="bg-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">View Grades</h2>
              <ChevronRight className="text-blue-900" size={24} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-900 hover:bg-blue-800 transition-colors text-white py-6 rounded-xl font-medium flex flex-col items-center justify-center">
                <span>Fall</span>
                <span>2024</span>
              </button>
              <button className="bg-blue-900 hover:bg-blue-800 transition-colors text-white py-6 rounded-xl font-medium flex flex-col items-center justify-center">
                <span>Winter</span>
                <span>2025</span>
              </button>
              <button className="bg-blue-900 hover:bg-blue-800 transition-colors text-white py-6 rounded-xl font-medium flex flex-col items-center justify-center">
                <span>Fall</span>
                <span>2025</span>
              </button>
              <button className="bg-blue-900 hover:bg-blue-800 transition-colors text-white py-6 rounded-xl font-medium flex flex-col items-center justify-center">
                <span>Winter</span>
                <span>2026</span>
              </button>
            </div>
          </div>

          {/* Enrollment Verification */}
          <div className="bg-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Enrollment Verification</h2>
            <p className="text-blue-900 mb-6 text-lg leading-relaxed">
              You are currently enrolled in Honours Bachelor of Interaction Design. To submit for Enrollment Verification, click Submit.
            </p>
            <div className="mt-auto">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 text-lg py-6 h-auto w-auto rounded-xl">
                Submit
              </Button>
            </div>
          </div>

        </div>

        {/* Request Unofficial Transcript */}
        <div className="bg-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-900">Request Unofficial Transcript</h2>
          <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8 text-lg py-2 h-auto rounded-lg">
            Submit
          </Button>
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
