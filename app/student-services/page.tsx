"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import {
  Heart,
  Accessibility,
  Calendar,
  Globe,
  FileText
} from "lucide-react";

export default function StudentServicesPage() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const services = [
    {
      title: "Mental Health Services",
      description: "Counselling Services are offered to assist students in building solutions to their own personal, emotional, or interpersonal concerns that may be impacting their academic success at Sheridan.",
      icon: Heart,
      href: "https://www.sheridancollege.ca/student-life/student-services/counselling-services"
    },
    {
      title: "Accessible Learning Services",
      description: "Accessible Learning (AL) is responsible for providing academic accommodation planning for students with disabilities to ensure barrier-free access to education.",
      icon: Accessibility,
      href: "https://www.sheridancollege.ca/student-life/student-services/accessible-learning-services"
    },
    {
      title: "First Year Guidance",
      description: "To make the most of your college experience, we encourage you to take advantage of the many social and academic events, programs, and services that we offer.",
      icon: Calendar,
      href: "https://www.sheridancollege.ca/student-life/student-services/first-year-experience"
    },
    {
      title: "International Student Advising",
      description: "Sheridan's Regulated International Student Immigration Advisers are here to help you with questions about studying and working in Canada.",
      icon: Globe,
      href: "https://www.sheridancollege.ca/admissions/international"
    },
    {
      title: "Student Advisement",
      description: "Student Advisement can help you get started at Sheridan and stay on track with your educational plan and goals. We're your first point of contact whenever you need academic advice, answers and support.",
      icon: FileText,
      href: "https://www.sheridancollege.ca/student-life/student-services/student-advisement"
    },
  ];

  return (
    <HackvilleLayout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="space-y-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-start p-6 rounded-2xl transition-colors block
                ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
              `}
            >
              <div className={`mr-6 mt-1 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                <service.icon size={40} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className={`text-xl font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
                  {service.title}
                </h2>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {service.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </HackvilleLayout>
  );
}
