"use client"

import * as React from "react"
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns"
import { Rocket, Calendar, FileText, Clock } from "lucide-react"

const SITE_START_DATE = new Date("2024-11-09")

function getSiteDuration() {
  const now = new Date()
  const years = differenceInYears(now, SITE_START_DATE)
  const months = differenceInMonths(now, SITE_START_DATE) % 12
  const days = differenceInDays(now, SITE_START_DATE) % 30

  return { years, months, days, totalDays: differenceInDays(now, SITE_START_DATE) }
}

export function SiteDuration() {
  const [mounted, setMounted] = React.useState(false)
  const [duration, setDuration] = React.useState({ years: 0, months: 0, days: 0, totalDays: 0 })
  const [isExpanded, setIsExpanded] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setDuration(getSiteDuration())

    // 每天更新一次
    const timer = setInterval(() => {
      setDuration(getSiteDuration())
    }, 86400000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border animate-pulse">
        <div className="h-32 bg-muted rounded-lg"></div>
      </div>
    )
  }


  return (
    <div className="group bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-border overflow-hidden">
      {/* 标题 */}
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
        <Rocket className="w-4 h-4 text-primary" />
        建站时长
      </h3>

      {/* 主显示区 */}
      <div className="relative">
        {/* 装饰背景 */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* 时间显示 - 一行显示 */}
        <div className="relative text-center py-4">
          <div className="flex items-baseline justify-center gap-1.5">
            {duration.years > 0 && (
              <>
                <span className="text-2xl font-bold text-primary tabular-nums">{duration.years}</span>
                <span className="text-sm text-muted-foreground mr-1">年</span>
              </>
            )}
            {duration.months > 0 && (
              <>
                <span className="text-2xl font-bold text-primary tabular-nums">{duration.months}</span>
                <span className="text-sm text-muted-foreground mr-1">月</span>
              </>
            )}
                <span className="text-2xl font-bold text-primary tabular-nums">{duration.days}</span>
            <span className="text-sm text-muted-foreground">天</span>
          </div>

          {/* 总天数 */}
          <p className="text-xs text-muted-foreground mt-2">
            累计 <span className="font-semibold text-foreground">{duration.totalDays}</span> 天
          </p>
        </div>
      </div>

      {/* 展开详情按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-3 pt-3 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
      >
        <Clock className="w-3 h-3" />
        {isExpanded ? "收起详情" : "查看详情"}
      </button>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-2 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>建站日期：2024年11月9日</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="w-3 h-3" />
            <span>持续更新中...</span>
          </div>
          <div className="mt-2 p-2 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center italic">
              &ldquo;每一段旅程都从第一步开始&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  )
}