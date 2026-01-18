"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function AcademicProgressCard() {
  const progress = 51
  const circumference = 2 * Math.PI * 45

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Academic Progress</CardTitle>
        <Button variant="ghost" size="sm" className="text-[#0B335E] hover:text-[#013767]">
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Progress Circle */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="45"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                className="text-[#0B335E] transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{progress}%</span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1 space-y-4 w-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Core Requirements</span>
                <span className="text-sm text-muted-foreground">18/24 credits</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#0B335E] rounded-full" style={{ width: "75%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Electives</span>
                <span className="text-sm text-muted-foreground">12/18 credits</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#013767] rounded-full" style={{ width: "67%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">General Education</span>
                <span className="text-sm text-muted-foreground">12/18 credits</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "67%" }} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
