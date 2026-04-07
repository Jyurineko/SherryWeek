import { WeatherData } from "@/types/weather";

// 模拟高德天气 API 数据
export const mockWeatherData: WeatherData = {
  live: {
    city: "北京",
    weather: "多云",
    temperature: 28,
    windDirection: "东南",
    windPower: "3级",
    humidity: 65,
    reportTime: "2024-04-07 14:30",
  },
  forecasts: [
    {
      date: "2024-04-07",
      dayWeather: "多云",
      nightWeather: "晴",
      dayTemp: 28,
      nightTemp: 18,
      dayWind: "东南",
      nightWind: "南",
      dayPower: "3级",
      nightPower: "2级",
    },
    {
      date: "2024-04-08",
      dayWeather: "晴",
      nightWeather: "多云",
      dayTemp: 30,
      nightTemp: 19,
      dayWind: "南",
      nightWind: "西南",
      dayPower: "2级",
      nightPower: "2级",
    },
    {
      date: "2024-04-09",
      dayWeather: "小雨",
      nightWeather: "阴",
      dayTemp: 25,
      nightTemp: 16,
      dayWind: "北",
      nightWind: "东北",
      dayPower: "3级",
      nightPower: "3级",
    },
  ],
};

// 天气现象到图标的映射
export const weatherIcons: Record<string, string> = {
  "晴": "☀️",
  "多云": "⛅",
  "阴": "☁️",
  "小雨": "🌦️",
  "中雨": "🌧️",
  "大雨": "⛈️",
  "暴雨": "⛈️",
  "雷阵雨": "⛈️",
  "雪": "🌨️",
  "雾": "🌫️",
  "霾": "😷",
};

// 获取天气图标
export function getWeatherIcon(weather: string): string {
  return weatherIcons[weather] || "🌡️";
}

// 格式化日期显示
export function formatForecastDate(dateStr: string, index: number): string {
  if (index === 0) return "今天";
  if (index === 1) return "明天";
  if (index === 2) return "后天";

  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}