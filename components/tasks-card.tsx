"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const tasks = [
  {
    id: 1,
    title: "Complete Course Evaluation",
    dueDate: "Due Jan 20",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Submit Health Insurance Waiver",
    dueDate: "Due Jan 25",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Update Emergency Contact",
    dueDate: "Due Feb 1",
    priority: "low",
    completed: false,
  },
  {
    id: 4,
    title: "Accept Financial Aid Award",
    dueDate: "Completed",
    priority: "high",
    completed: true,
  },
]

export function TasksCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Pending Tasks</CardTitle>
        <Button variant="ghost"
          size="sm"
          className="text-[#0B335E] hover:bg-[#0B335E] hover:text-white transition-colors">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={cn(
                "flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer hover:bg-muted/50",
                task.completed && "opacity-60"
              )}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className={cn(
                  "h-5 w-5 flex-shrink-0 mt-0.5",
                  task.priority === "high" ? "text-red-500" :
                    task.priority === "medium" ? "text-amber-500" : "text-muted-foreground"
                )} />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </p>
                <span className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <Clock className="h-3 w-3" />
                  {task.dueDate}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
