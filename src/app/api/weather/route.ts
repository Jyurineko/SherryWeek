import { NextRequest, NextResponse } from "next/server";

const AMAP_KEY = process.env.AMAP_WEATHER_KEY;
const DEFAULT_CITY_CODE = process.env.DEFAULT_CITY_CODE || "310000";

// 高德天气 API 响应类型
interface AmapWeatherLiveResponse {
  status: "1" | "0";
  info: string;
  infocode: string;
  count?: string;
  lives?: AmapLiveWeather[];
}

interface AmapWeatherForecastResponse {
  status: "1" | "0";
  info: string;
  infocode: string;
  count?: string;
  forecasts?: AmapForecast[];
}

interface AmapLiveWeather {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

interface AmapForecast {
  city: string;
  adcode: string;
  province: string;
  reporttime: string;
  casts: AmapCast[];
}

interface AmapCast {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}

// 城市名称到编码的映射（常用城市）
const cityNameToCode: Record<string, string> = {
  "北京": "110000",
  "天津": "120000",
  "上海": "310000",
  "重庆": "500000",
  "石家庄": "130100",
  "太原": "140100",
  "呼和浩特": "150100",
  "沈阳": "210100",
  "大连": "210200",
  "长春": "220100",
  "哈尔滨": "230100",
  "南京": "320100",
  "苏州": "320500",
  "杭州": "330100",
  "宁波": "330200",
  "温州": "330300",
  "合肥": "340100",
  "福州": "350100",
  "厦门": "350200",
  "南昌": "360100",
  "济南": "370100",
  "青岛": "370200",
  "郑州": "410100",
  "武汉": "420100",
  "长沙": "430100",
  "广州": "440100",
  "深圳": "440300",
  "南宁": "450100",
  "海口": "460100",
  "成都": "510100",
  "贵阳": "520100",
  "昆明": "530100",
  "拉萨": "540100",
  "西安": "610100",
  "兰州": "620100",
  "西宁": "630100",
  "银川": "640100",
  "乌鲁木齐": "650100",
};

function getCityCode(cityName: string): string {
  const normalizedName = cityName.replace(/市$/, "");
  return cityNameToCode[normalizedName] || cityNameToCode[cityName] || DEFAULT_CITY_CODE;
}

async function getLiveWeather(cityCode: string): Promise<AmapLiveWeather | null> {
  try {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${cityCode}`;
    const response = await fetch(url, { cache: "no-store" });
    const data: AmapWeatherLiveResponse = await response.json();

    if (data.status !== "1" || !data.lives || data.lives.length === 0) {
      console.error("获取实时天气失败:", data.info);
      return null;
    }

    return data.lives[0];
  } catch (error) {
    console.error("获取实时天气出错:", error);
    return null;
  }
}

async function getForecastWeather(cityCode: string): Promise<AmapCast[] | null> {
  try {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${cityCode}&extensions=all`;
    const response = await fetch(url, { cache: "no-store" });
    const data: AmapWeatherForecastResponse = await response.json();

    if (data.status !== "1" || !data.forecasts || data.forecasts.length === 0) {
      console.error("获取天气预报失败:", data.info);
      return null;
    }

    return data.forecasts[0].casts.slice(0, 3);
  } catch (error) {
    console.error("获取天气预报出错:", error);
    return null;
  }
}

function transformWeatherData(live: AmapLiveWeather, casts: AmapCast[]) {
  return {
    live: {
      city: live.city,
      weather: live.weather,
      temperature: parseInt(live.temperature, 10),
      windDirection: live.winddirection,
      windPower: live.windpower,
      humidity: parseInt(live.humidity, 10),
      reportTime: live.reporttime,
    },
    forecasts: casts.map((cast) => ({
      date: cast.date,
      dayWeather: cast.dayweather,
      nightWeather: cast.nightweather,
      dayTemp: parseInt(cast.daytemp, 10),
      nightTemp: parseInt(cast.nighttemp, 10),
      dayWind: cast.daywind,
      nightWind: cast.nightwind,
      dayPower: cast.daypower,
      nightPower: cast.nightpower,
    })),
  };
}

async function getCityByIp(): Promise<{ name: string; code: string } | null> {
  try {
    const url = `https://restapi.amap.com/v3/ip?key=${AMAP_KEY}`;
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    if (data.status !== "1" || !data.city) {
      console.error("IP 定位失败:", data.info);
      return null;
    }

    const cityName = data.city.replace(/市$/, "");
    const cityCode = data.adcode || getCityCode(cityName);

    return { name: cityName, code: cityCode };
  } catch (error) {
    console.error("IP 定位出错:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cityCode = searchParams.get("city");

    let targetCityCode = cityCode || undefined;
    let cityName = "";

    // 如果没有提供城市编码，使用 IP 定位
    if (!targetCityCode) {
      const ipLocation = await getCityByIp();
      if (ipLocation) {
        targetCityCode = ipLocation.code;
        cityName = ipLocation.name;
      } else {
        targetCityCode = DEFAULT_CITY_CODE;
        cityName = "上海";
      }
    }

    const [liveData, forecastData] = await Promise.all([
      getLiveWeather(targetCityCode),
      getForecastWeather(targetCityCode),
    ]);

    if (!liveData) {
      return NextResponse.json(
        { success: false, error: "获取天气数据失败" },
        { status: 500 }
      );
    }

    const weatherData = transformWeatherData(liveData, forecastData || []);

    return NextResponse.json({
      success: true,
      data: weatherData,
      city: cityName || liveData.city,
    });
  } catch (error) {
    console.error("天气 API 出错:", error);
    return NextResponse.json(
      { success: false, error: "获取天气数据时发生错误" },
      { status: 500 }
    );
  }
}