"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";

export default function StudentServicesPage() {
  const { t } = useLanguage();
  
  return (
    <HackvilleLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-900 inline-block pb-1">
            {t('studentServices')}
          </h1>
        </header>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-gray-600">Access various student support services, including career advice, counseling, and health services.</p>
        </div>
      </div>
    </HackvilleLayout>
  );
}
