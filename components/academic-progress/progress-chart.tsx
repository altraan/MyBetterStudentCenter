"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Completed", value: 58 },
    { name: "Remaining", value: 42 },
];

const COLORS = ["#1e3a8a", "#ffffff"]; // Blue-900, White

export default function ProgressChart() {
    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                        stroke="none"
                    >
                        {/* Background Circle (White/Gray track) - simulated by second segment being white/transparent on gray bg */}
                        <Cell key="cell-0" fill="#1e3a8a" />
                        <Cell key="cell-1" fill="rgba(255,255,255,0.5)" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Centered Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-6xl font-bold text-blue-900">58%</span>
                <span className="text-xl text-blue-900 mt-2">Completed</span>
            </div>
        </div>
    );
}
