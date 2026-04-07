"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"

export function BlogCalendar() {
  const router = useRouter()
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // 点击日期跳转到归档页面
  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      // 跳转到按日期筛选的文章页面
      router.push(`/posts?date=${formattedDate}`)
    }
  }

  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-border">
      <h3 className="font-semibold py-4 px-5 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground border-b border-gray-100 dark:border-border">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        日历
      </h3>

      <div className="p-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          locale={zhCN}
          className="rounded-lg border"
        />
      </div>

      <div className="py-3 px-5 text-xs text-gray-500 dark:text-muted-foreground text-center border-t border-gray-100 dark:border-border">
        点击日期查看当日文章
      </div>
    </div>
  )
}