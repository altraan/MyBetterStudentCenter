"use client";

import HackvilleGrid from "@/components/HackvilleGrid";
import HackvilleHeader from "@/components/HackvilleHeader";
import { useLanguage } from "@/components/LanguageContext";

export default function HackvillePage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gray-100">
            <HackvilleHeader />
            <div className="pt-24 pb-10 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-blue-900 mb-8">{t('serviceHub')}</h1>
                <HackvilleGrid />
            </div>
        </div>
    );
}
