"use client"

import { QuickStatsCards } from "@/components/quick-stats-cards"
import { AcademicProgressCard } from "@/components/academic-progress-card"
import { UpcomingClassesCard } from "@/components/upcoming-classes-card"
import { FinancialOverviewCard } from "@/components/financial-overview-card"
import { TasksCard } from "@/components/tasks-card"
import { QuickLinksCard } from "@/components/quick-links-card"

export function DashboardContent() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, Alex
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your academic journey
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Winter 2026 Semester</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>Week 3 of 15</span>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStatsCards />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AcademicProgressCard />
        <UpcomingClassesCard />
      </div>

      {/* Secondary Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <FinancialOverviewCard />
        <TasksCard />
        <QuickLinksCard />
      </div>
    </div>
  )
}
