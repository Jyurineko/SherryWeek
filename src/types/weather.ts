// 高德天气 API 类型定义

export interface WeatherLive {
  city: string;           // 城市名称
  weather: string;        // 天气现象（晴、多云、雨等）
  temperature: number;    // 当前温度（摄氏度）
  windDirection: string;  // 风向
  windPower: string;      // 风力级别
  humidity: number;       // 空气湿度（百分比）
  reportTime: string;     // 数据发布时间
}

export interface WeatherForecast {
  date: string;           // 日期
  dayWeather: string;     // 白天天气
  nightWeather: string;   // 夜间天气
  dayTemp: number;        // 白天温度
  nightTemp: number;      // 夜间温度
  dayWind: string;        // 白天风向
  nightWind: string;      // 夜间风向
  dayPower: string;       // 白天风力
  nightPower: string;     // 夜间风力
}

export interface WeatherData {
  live: WeatherLive;
  forecasts: WeatherForecast[]; // 3天预报（当天、明天、后天）
}