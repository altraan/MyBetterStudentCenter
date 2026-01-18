"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Clock, AlignCenter, AlignCenterVertical } from "lucide-react"

const classes = [
  {
    code: "COMP 2143",
    name: "Data Structures & Algorithms",
    time: "9:00 AM - 10:30 AM",
    location: "Room B204",
    instructor: "Dr. Smith"
  },
  {
    code: "MATH 1051",
    name: "Calculus II",
    time: "11:00 AM - 12:30 PM",
    location: "Room A115",
    instructor: "Prof. Johnson"
  },
  {
    code: "COMM 1100",
    name: "Professional Communication",
    time: "2:00 PM - 3:30 PM",
    location: "Room C302",
    instructor: "Ms. Davis"
  },
]

export function UpcomingClassesCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Today&apos;s Schedule</CardTitle>
        <Button variant="ghost"
          size="sm"
          className="text-[#0B335E] hover:bg-[#0B335E] hover:text-white transition-colors">
          Full Schedule
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {classes.map((cls) => (
          <div
            key={cls.code}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="flex-shrink-0 w-16 text-center">
              <div className="text-xs font-medium text-[#0B335E]">
                {cls.code.split(' ')[0]}
              </div>
              <div className="text-xs font-medium text-[#0B335E]">
                {cls.code.split(' ')[1]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{cls.name}</h4>
              <p className="text-sm text-muted-foreground">{cls.instructor}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {cls.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {cls.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
