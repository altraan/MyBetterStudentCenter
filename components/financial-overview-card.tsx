"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowRight, CreditCard } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function FinancialOverviewCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Financial Overview</CardTitle>
        <Link href="/financial-account">
          <Button variant="ghost" size="sm" className="text-[#0B335E] hover:text-[#013767]">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Payment of $1,250.00 due by Feb 15, 2026
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Tuition & Fees</span>
            <span className="font-medium">$4,500.00</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Financial Aid</span>
            <span className="font-medium text-emerald-600">-$2,500.00</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Payments Made</span>
            <span className="font-medium text-emerald-600">-$750.00</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">Balance Due</span>
            <span className="font-bold text-[#0B335E]">$1,250.00</span>
          </div>
        </div>

        <Button className="w-full bg-[#0B335E] hover:bg-[#013767] text-white">
          <CreditCard className="h-4 w-4 mr-2" />
          Make a Payment
        </Button>
      </CardContent>
    </Card>
  )
}
