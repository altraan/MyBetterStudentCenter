"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";

const data = [
    { term: "Winter 2026", balance: -81.97 },
    { term: "Fall 2025", balance: 0.00 },
    { term: "Winter 2025", balance: 0.00 },
    { term: "Fall 2024", balance: 0.00 },
];

export default function AccountSummaryChart() {
    return (
        <div className="w-full h-full min-h-[160px]">
            <div className="flex justify-between items-center mb-2 border-b pb-2">
                <span className="font-bold text-xs text-red-800 uppercase">Account Summary</span>
                <span className="font-bold text-xs uppercase">Balance</span>
            </div>
            <div className="space-y-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs py-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-gray-700">{item.term}</span>
                        <span className="font-bold text-gray-900">{item.balance.toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex items-center justify-between text-xs py-2 border-t border-gray-300 mt-2 font-bold">
                    <span className="uppercase text-gray-900">Overall Account Balance</span>
                    <span className="text-gray-900">-81.97</span>
                </div>
            </div>
        </div>
    );
}
