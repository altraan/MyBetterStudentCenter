"use client"

import { BookOpen, CheckCircle2, Clock, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Enrolled Courses",
    value: "5",
    icon: BookOpen,
    description: "This semester",
    color: "bg-[#0B335E]",
  },
  {
    label: "Current GPA",
    value: "3.7",
    icon: CheckCircle2,
    description: "Cumulative",
    color: "bg-[#013767]",
  },
  {
    label: "Credits Completed",
    value: "42",
    icon: Clock,
    description: "of 120 required",
    color: "bg-[#013767]",
  },
  {
    label: "Account Balance",
    value: "$1,250",
    icon: DollarSign,
    description: "Payment due Feb 15",
    color: "bg-[#013767]",
  },
]

export function QuickStatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className={`${stat.color} w-1`} />
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
