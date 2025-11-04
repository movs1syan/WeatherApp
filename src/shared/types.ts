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

export interface ForecastData {
  list: WeatherData[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

export interface SearchData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export type UnitsType = "metric" | "imperial";