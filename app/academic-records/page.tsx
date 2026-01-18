"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { mockCourseHistory, mockGradesByTerm } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, GraduationCap, FileText, Award } from "lucide-react";
import { useState } from "react";

export default function AcademicRecordsPage() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const terms = Object.keys(mockGradesByTerm);

  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Course History Section */}
        <div className={`rounded-xl p-6 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
              <GraduationCap size={24} />
              Course History
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {mockCourseHistory.map((course, i) => (
              <div
                key={i}
                className={`rounded-lg p-4 flex items-center justify-between ${isDarkMode ? 'bg-blue-900/50 text-white' : 'bg-blue-900 text-white'
                  }`}
              >
                <div>
                  <span className="font-medium">{course.name}</span>
                  <span className={`text-xs ml-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-200'}`}>
                    {course.term}
                  </span>
                </div>
                <span className={`text-lg font-bold ${course.grade.startsWith('A') ? 'text-emerald-400' :
                    course.grade.startsWith('B') ? 'text-yellow-400' : 'text-white'
                  }`}>
                  {course.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Three Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* View Grades */}
          <div className={`rounded-xl p-6 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                <Award size={24} />
                View Grades
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {terms.map((term, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTerm(selectedTerm === term ? null : term)}
                  className={`py-6 rounded-xl font-medium flex flex-col items-center justify-center transition-all ${selectedTerm === term
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : (isDarkMode ? 'bg-blue-900/50 text-white hover:bg-blue-800' : 'bg-blue-900 text-white hover:bg-blue-800')
                    }`}
                >
                  <span>{term.split(' ')[0]}</span>
                  <span>{term.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Grade Details */}
            {selectedTerm && mockGradesByTerm[selectedTerm as keyof typeof mockGradesByTerm] && (
              <div className={`mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>{selectedTerm} Grades</h3>
                <div className="space-y-2">
                  {mockGradesByTerm[selectedTerm as keyof typeof mockGradesByTerm].map((course, i) => (
                    <div key={i} className={`flex justify-between items-center py-2 border-b last:border-0 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{course.course}</span>
                        <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{course.name}</span>
                      </div>
                      <span className={`font-bold ${course.grade.startsWith('A') ? 'text-emerald-500' :
                          course.grade.startsWith('B') ? 'text-yellow-500' :
                            course.grade === 'In Progress' ? (isDarkMode ? 'text-gray-400' : 'text-gray-500') : 'text-gray-700'
                        }`}>
                        {course.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enrollment Verification */}
          <div className={`rounded-xl p-6 shadow-sm flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
              <FileText size={24} />
              Enrollment Verification
            </h2>
            <p className={`mb-6 text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-blue-900'}`}>
              You are currently enrolled in Honours Bachelor of Interaction Design. To submit for Enrollment Verification, click Submit.
            </p>
            <div className="mt-auto">
              <Button className={`px-8 text-lg py-6 h-auto w-auto rounded-xl ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-900 hover:bg-blue-800'} text-white`}>
                Submit
              </Button>
            </div>
          </div>

        </div>

        {/* Request Unofficial Transcript */}
        <div className={`rounded-xl p-6 shadow-sm flex items-center justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Request Unofficial Transcript</h2>
          <Button className={`px-8 text-lg py-2 h-auto rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-900 hover:bg-blue-800'} text-white`}>
            Submit
          </Button>
        </div>

      </div>
    </HackvilleLayout>
  );
}
