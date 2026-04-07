"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getYear,
  setYear,
  setMonth,
  parseISO
} from "date-fns"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAllPosts } from "@/lib/mock-data"

// 生成日历数据（周一开始）
function getCalendarDays(currentDate: Date): Date[] {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  // 周一开始
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
}

// 月份选项
const MONTHS = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月"
]

export function MiniCalendar() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const today = new Date()

  const calendarDays = getCalendarDays(currentDate)
  const currentYear = getYear(currentDate)
  const currentMonth = currentDate.getMonth()

  // 获取文章发布日期列表
  const posts = getAllPosts()
  const postDates = React.useMemo(() => {
    return new Set(
      posts.map(post => format(parseISO(post.publishedAt), "yyyy-MM-dd"))
    )
  }, [posts])

  // 检查某天是否有文章发布
  const hasPostOnDate = (day: Date): boolean => {
    return postDates.has(format(day, "yyyy-MM-dd"))
  }

  // 处理日期选择
  const handleSelectDate = (day: Date) => {
    if (!isSameMonth(day, currentDate)) return // 只能选当月
    setSelectedDate(day)
    const formattedDate = format(day, "yyyy-MM-dd")
    router.push(`/posts?date=${formattedDate}`)
  }

  // 切换月份
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  // 处理年份选择
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value)
    setCurrentDate(setYear(currentDate, year))
  }

  // 处理月份选择
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value)
    setCurrentDate(setMonth(currentDate, month))
  }

  // 生成年份选项（前后10年）
  const yearOptions = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  // 星期标题（周一开始）
  const weekDays = ["一", "二", "三", "四", "五", "六", "日"]

  return (
    <div className="group bg-card w-full max-w-[280px] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border overflow-hidden">
      {/* 标题栏 */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-border/50">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-foreground">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          日历
        </h3>
      </div>

      {/* 导航栏：年月下拉选择 + 箭头 */}
      <div className="flex items-center justify-between px-1.5 py-1.5 gap-0.5">
        {/* 左箭头 */}
        <button
          onClick={prevMonth}
          className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-muted transition-colors text-gray-600 dark:text-muted-foreground shrink-0"
          aria-label="上个月"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {/* 年月下拉选择（居中） */}
        <div className="flex items-center gap-1 justify-center flex-1 min-w-0">
          {/* 年份选择 */}
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="h-7 px-1.5 text-xs font-medium bg-white dark:bg-card border border-gray-200 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-center"
            style={{ minWidth: '3.5rem' }}
          >
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>

          {/* 月份选择 */}
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="h-7 px-1.5 text-xs font-medium bg-white dark:bg-card border border-gray-200 dark:border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-center"
            style={{ minWidth: '2.5rem' }}
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
        </div>

        {/* 右箭头 */}
        <button
          onClick={nextMonth}
          className="h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-muted transition-colors text-gray-600 dark:text-muted-foreground shrink-0"
          aria-label="下个月"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 px-2 pb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="h-9 w-9 flex items-center justify-center text-xs font-medium text-muted-foreground mx-auto"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日期格子 */}
      <div className="grid grid-cols-7 gap-1 px-2 pb-3">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isToday = isSameDay(day, today)
          const hasPost = hasPostOnDate(day)

          return (
            <div key={index} className="relative flex items-center justify-center py-0.5">
              {/* 今日背景指示器 - 更小且不重叠 */}
              {isToday && isCurrentMonth && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600"></span>
                </span>
              )}
              <button
                onClick={() => handleSelectDate(day)}
                disabled={!isCurrentMonth}
                className={cn(
                  "relative z-10 h-6 w-6 flex items-center justify-center text-xs rounded-md transition-all duration-200",
                  isSelected && isCurrentMonth
                    ? "bg-primary text-primary-foreground scale-110 shadow-sm"
                    : isToday && isCurrentMonth
                      ? "text-foreground font-semibold"
                      : !isCurrentMonth
                        ? "text-gray-400 dark:text-gray-600 cursor-default"
                          : hasPost
                            ? "text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-full"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-foreground text-foreground rounded-full"
                )}
              >
                {format(day, "d")}
              </button>
            </div>
          )
        })}
      </div>

      {/* 底部分割线和文字 */}
      <div className="border-t border-gray-100 dark:border-border/50 px-4 py-2.5">
        <p className="text-xs text-center text-gray-500 dark:text-muted-foreground">
          点击日期查看当日文章
        </p>
      </div>
    </div>
  )
}