"use client"

import * as React from "react"
import { Cloud, Droplets, Wind, MapPin, Clock, Thermometer } from "lucide-react"
import { WeatherData } from "@/types/weather"
import { mockWeatherData, getWeatherIcon, formatForecastDate } from "@/lib/weather-mock"
import { cn } from "@/lib/utils"

interface WeatherCardProps {
  data?: WeatherData; // 可选，用于接入真实 API
  loading?: boolean;
  error?: string;
}

export function WeatherCard({ data = mockWeatherData, loading, error }: WeatherCardProps) {
  if (loading) {
    return (
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border animate-pulse">
        <div className="h-48 bg-muted rounded-lg"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
        <div className="text-center py-8">
          <Cloud className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  const { live, forecasts } = data

  return (
    <div className="group bg-card rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-border overflow-hidden">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-foreground">
          <Cloud className="w-4 h-4 text-primary" />
          今日天气
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {live.city}
        </div>
      </div>

      {/* 实时天气 - 主显示区 - 窄边栏优化 */}
      <div className="relative mb-4">
        {/* 装饰背景 */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative bg-muted/50 rounded-xl p-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl">{getWeatherIcon(live.weather)}</span>
            <div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-foreground tabular-nums">
                  {live.temperature}
                </span>
                <span className="text-sm text-muted-foreground">°C</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center mb-2">{live.weather}</p>

          {/* 详情 - 紧凑布局 */}
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Wind className="w-3 h-3" />
              {live.windDirection}{live.windPower}
            </span>
            <span className="flex items-center gap-0.5">
              <Droplets className="w-3 h-3" />
              {live.humidity}%
            </span>
          </div>

          {/* 发布时间 */}
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground/60">
            <Clock className="w-3 h-3" />
            <span>{live.reportTime.slice(5)}</span>
          </div>
        </div>
      </div>

      {/* 3天预报 - 窄边栏优化 */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground mb-1">预报</p>
        {forecasts.map((forecast, index) => (
          <div
            key={forecast.date}
            className={cn(
              "flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors",
              index === 0 ? "bg-primary/5" : "hover:bg-muted/50"
            )}
          >
            {/* 日期 */}
            <span className="text-xs font-medium text-foreground w-8">
              {formatForecastDate(forecast.date, index)}
            </span>

            {/* 图标 */}
            <span className="text-base">{getWeatherIcon(forecast.dayWeather)}</span>

            {/* 温度 */}
            <div className="flex items-center gap-0.5 text-xs tabular-nums">
              <span className="text-foreground font-medium">{forecast.dayTemp}°</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{forecast.nightTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}