"use client";

import { useState } from "react";
import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isDarkMode: boolean;
}

function ExpandableSection({ title, isOpen, onToggle, children, isDarkMode }: ExpandableSectionProps) {
  return (
    <div className={`rounded-xl overflow-hidden mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
          }`}
      >
        <span className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-900'}`}>{title}</span>
        {isOpen ? (
          <ChevronUp className={isDarkMode ? 'text-gray-400' : 'text-blue-900'} size={24} />
        ) : (
          <ChevronDown className={isDarkMode ? 'text-gray-400' : 'text-blue-900'} size={24} />
        )}
      </button>
      {isOpen && (
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white/50 border border-gray-200 shadow-inner'}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegistrationStatusPage() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const [openSection, setOpenSection] = useState<string | null>("intent");

  return (
    <HackvilleLayout>
      <div className="max-w-4xl mx-auto py-8">
        <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/80 border border-gray-200'}`}>

          {/* Header Pill */}
          <div className="mb-8">
            <span className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-white text-blue-900 border border-gray-200 shadow-sm'
              }`}>
              Registration Status
            </span>
          </div>

          {/* Intent to Register Section */}
          <ExpandableSection
            title="Intent to Register"
            isOpen={openSection === "intent"}
            onToggle={() => setOpenSection(openSection === "intent" ? null : "intent")}
            isDarkMode={isDarkMode}
          >
            <p className={`text-lg transition-colors ${isDarkMode ? 'text-gray-300' : 'text-blue-900'}`}>
              Intent to Register is currently unavailable, it will reopen next term.
            </p>
          </ExpandableSection>

          {/* Apply to a New Program Section */}
          <ExpandableSection
            title="Apply to a New Program"
            isOpen={openSection === "apply"}
            onToggle={() => setOpenSection(openSection === "apply" ? null : "apply")}
            isDarkMode={isDarkMode}
          >
            <p className={`text-lg transition-colors leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Current or former Sheridan students can <a href="#" className="text-blue-600 underline hover:text-blue-800">apply to a new program</a> using this online application. Currently there is no application fee.
            </p>
          </ExpandableSection>

        </div>
      </div>
    </HackvilleLayout>
  );
}
