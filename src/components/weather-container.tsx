"use client";

import * as React from "react";
import { WeatherCard } from "@/components/weather-card";
import { WeatherData } from "@/types/weather";

interface WeatherApiResponse {
  success: boolean;
  data?: WeatherData;
  error?: string;
  city?: string;
}

export function WeatherContainer() {
  const [weatherData, setWeatherData] = React.useState<WeatherData | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      try {
        setLoading(true);
        setError(undefined);

        const response = await fetch("/api/weather");
        const result: WeatherApiResponse = await response.json();

        if (!isMounted) return;

        if (result.success && result.data) {
          setWeatherData(result.data);
        } else {
          setError(result.error || "获取天气数据失败");
        }
      } catch (err) {
        if (!isMounted) return;
        setError("获取天气数据时发生错误");
        console.error("Weather fetch error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    // 每30分钟刷新一次天气数据
    const intervalId = setInterval(loadWeather, 30 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <WeatherCard
      data={weatherData}
      loading={loading}
      error={error}
    />
  );
}
