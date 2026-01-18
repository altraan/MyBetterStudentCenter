"use client";

import { ArrowUpDown, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

const receipts = [
    { date: "01/09/2026", time: "10:12:17AM", type: "Stdnt Pymt", amount: 4580.14, receipt: "2764247" },
    { date: "09/16/2025", time: "4:44:01PM", type: "Stdnt Pymt", amount: 4021.22, receipt: "2717635" },
    { date: "07/03/2025", time: "11:21:42AM", type: "Stdnt Pymt", amount: 250.00, receipt: "2676641" },
    { date: "12/16/2024", time: "10:53:15AM", type: "Stdnt Pymt", amount: 4404.25, receipt: "2592923" },
    { date: "07/19/2024", time: "10:24:59AM", type: "Stdnt Pymt", amount: 4748.78, receipt: "2524646" },
];

export default function ReceiptsTable() {
    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden text-xs md:text-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="p-3 font-bold text-gray-700 whitespace-nowrap">
                                Transaction Date <ArrowUpDown className="inline w-3 h-3 ml-1" />
                            </th>
                            <th className="p-3 font-bold text-gray-700 whitespace-nowrap">
                                Transaction Time <ArrowUpDown className="inline w-3 h-3 ml-1" />
                            </th>
                            <th className="p-3 font-bold text-gray-700 whitespace-nowrap">
                                Transaction Type <ArrowUpDown className="inline w-3 h-3 ml-1" />
                            </th>
                            <th className="p-3 font-bold text-gray-700 whitespace-nowrap text-right">
                                Amount <ArrowUpDown className="inline w-3 h-3 ml-1" />
                            </th>
                            <th className="p-3 font-bold text-gray-700 whitespace-nowrap text-right">
                                Receipt Number
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((row, i) => (
                            <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <td className="p-3 text-gray-600">{row.date}</td>
                                <td className="p-3 text-gray-600">{row.time}</td>
                                <td className="p-3 text-gray-600">{row.type}</td>
                                <td className="p-3 text-gray-900 font-medium text-right">{row.amount.toFixed(2)}</td>
                                <td className="p-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-gray-600">{row.receipt}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-600">
                                            <Printer className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
