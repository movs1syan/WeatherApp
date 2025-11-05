export interface WeatherData {
  name: string;
  dt: number;
  dt_txt: string;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
}

export interface ForecastItemData {
  date: string;
  forecasts: WeatherData[]
}

export type ForecastData = ForecastItemData[];

export interface SearchData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface NotificationType {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  description: string;
}

export type UnitsType = "metric" | "imperial" | string;