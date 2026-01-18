"use client";

import React from "react";
import {
  User,
  FileText,
  BookOpen,
  Calendar,
  DollarSign,
  Headphones,
  ClipboardCheck,
  ArrowRightLeft,
  AlertTriangle,
  Users,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

type GridItem = {
  labelKey: string; // Changed from label to labelKey
  color: string;
  icon: React.ReactNode;
};

export default function HackvilleGrid() {
  const { t } = useLanguage();

  const items: GridItem[] = [
    {
      labelKey: "memberInfo",
      color: "hover:bg-blue-600",
      icon: <User size={70} className="text-white" />,
    },
    {
      labelKey: "academicRecords",
      color: "hover:bg-blue-500",
      icon: <FileText size={70} className="text-white" />,
    },
    {
      labelKey: "courseEnrollment",
      color: "hover:bg-cyan-500",
      icon: <BookOpen size={70} className="text-white" />,
    },
    {
      labelKey: "manageClasses",
      color: "hover:bg-orange-600",
      icon: <Calendar size={70} className="text-white" />,
    },
    {
      labelKey: "finance",
      color: "hover:bg-emerald-500",
      icon: <DollarSign size={70} className="text-white" />,
    },
    {
      labelKey: "serviceRequests",
      color: "hover:bg-yellow-500",
      icon: <Headphones size={70} className="text-white" />,
    },
    {
      labelKey: "registrationStatus",
      color: "hover:bg-teal-400",
      icon: <ClipboardCheck size={70} className="text-white" />,
    },
    {
      labelKey: "creditTransfer",
      color: "hover:bg-purple-600",
      icon: <ArrowRightLeft size={70} className="text-white" />,
    },
    {
      labelKey: "sheridanAlert",
      color: "hover:bg-red-600",
      icon: <AlertTriangle size={70} className="text-white" />,
    },
    {
      labelKey: "studentServices",
      color: "hover:bg-indigo-600",
      icon: <Users size={70} className="text-white" />,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* 
        Grid Layout:
        Using grid-cols-2 for mobile
        grid-cols-3 for tablet
        grid-cols-4 for desktop to resemble the wide layout 
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`
              relative 
              bg-blue-900
              ${item.color} 
              aspect-[4/3] 
              rounded-lg 
              shadow-md 
              cursor-pointer 
              overflow-hidden
              group
              transition-all duration-300
              hover:scale-105
            `}
          >
            {/* Center Content Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">

              {/* Text Label - Fades out on hover */}
              <span className="text-white font-bold text-xl md:text-2xl transition-opacity duration-300 group-hover:opacity-0 group-hover:delay-0 opacity-100">
                {t(item.labelKey as any)}
              </span>

              {/* Icon - Scales/Fades in on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
