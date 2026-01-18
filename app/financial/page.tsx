"use client";

import HackvilleLayout from "@/components/HackvilleLayout";
import { useLanguage } from "@/components/LanguageContext";
import AccountSummaryList from "@/components/financial/account-summary-list";
import ReceiptsTable from "@/components/financial/receipts-table";
import { Button } from "@/components/ui/button";
import { ClipboardList, ChevronDown } from "lucide-react";

export default function FinancialPage() {
  const { t } = useLanguage();

  return (
    <HackvilleLayout>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Account Balance Header */}
        <div className="bg-gray-200 rounded-xl p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold text-blue-900 mb-1">Account Balance</h2>
          <div className="text-lg text-blue-900">
            Total Due: <span className="font-extrabold text-blue-900 text-xl">$0.00 CAD</span>
          </div>
        </div>

        {/* Account Summary Card */}
        <div className="bg-gray-200 rounded-xl p-6 shadow-sm relative">
          <div className="flex items-center justify-center mb-6 relative">
            <h2 className="text-xl font-bold text-blue-900">Account Summary</h2>
            <div className="absolute right-0 top-0 text-blue-900">
              <ClipboardList size={40} strokeWidth={1.5} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <AccountSummaryList />
          </div>
        </div>

        {/* View Fee Estimate */}
        <div className="bg-gray-200 rounded-xl p-4 md:px-8 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">View my Fee Estimate</h2>
          <Button className="bg-blue-900 hover:bg-blue-800 text-white px-8">Print</Button>
        </div>

        {/* View Receipts */}
        <div className="bg-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center mb-6 relative">
            <div className="flex items-center cursor-pointer group">
              <h2 className="text-xl font-bold text-blue-900 me-2">View my Reciepts</h2>
              <ChevronDown className="text-blue-900 group-hover:translate-y-1 transition-transform" size={32} />
            </div>

            <div className="absolute right-0 top-0 text-white bg-blue-900 p-3 rounded-full shadow-lg -mt-8 -mr-2">
              {/* Decorative Star Icon similar to screenshot */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
          <ReceiptsTable />
        </div>

        {/* View T2202 */}
        <div className="bg-gray-200 rounded-xl p-4 md:px-8 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold text-blue-900">View my T2202</h2>
          <Button className="bg-blue-900 hover:bg-blue-800 text-white px-4 flex items-center gap-2">
            Available PDFs
            <ChevronDown size={16} />
          </Button>
        </div>

      </div>
    </HackvilleLayout>
  );
}
