"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { useLanguage } from "@/components/LanguageContext"

export function AcademicProgressCard() {
  const { t } = useLanguage()
  const targetProgress = 51
  const [progress, setProgress] = useState(0)
  const [showText, setShowText] = useState(false)
  const circumference = 2 * Math.PI * 45

  useEffect(() => {
    // Start ring animation shortly after mount
    const ringTimer = setTimeout(() => {
      setProgress(targetProgress)
    }, 100)

    // Show text after ring animation is mostly complete
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 600) // 100ms start delay + 500ms duration = 600ms

    return () => {
      clearTimeout(ringTimer)
      clearTimeout(textTimer)
    }
  }, [targetProgress])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{t('academicProgress')}</CardTitle>
        <Link href="/academic-progress">
          <Button variant="ghost" size="sm" className="text-[#0B335E] hover:text-[#013767]">
            {t('viewDetails')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
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
                className="text-[#0B335E] transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 transform ${showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <span className="text-3xl font-bold text-foreground">{targetProgress}%</span>
              <span className="text-xs text-muted-foreground">{t('complete')}</span>
            </div>
          </div>

          {/* Progress Details */}
          <div className="flex-1 space-y-4 w-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t('coreRequirements')}</span>
                <span className="text-sm text-muted-foreground">18/24 {t('credits')}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#0B335E] rounded-full transition-all duration-1000 ease-out" style={{ width: showText ? "75%" : "0%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t('electives')}</span>
                <span className="text-sm text-muted-foreground">12/18 {t('credits')}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#013767] rounded-full transition-all duration-1000 ease-out delay-100" style={{ width: showText ? "67%" : "0%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t('generalEducation')}</span>
                <span className="text-sm text-muted-foreground">12/18 {t('credits')}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out delay-200" style={{ width: showText ? "67%" : "0%" }} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
