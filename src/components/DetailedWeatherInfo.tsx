import React from 'react';
import type { WeatherData } from "../shared/types.ts";

interface DetailedWeatherInfoProps {
  weather: WeatherData;
  units: string;
}

const DetailedWeatherInfo: React.FC<DetailedWeatherInfoProps> = ({ weather, units }) => {
  const iconCode = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <>
      <div className="flex items-center text-5xl">
        <img src={iconUrl} alt={weather.weather[0].description} className="w-15" />
        {Math.round(weather.main.temp)} {units === "metric" ? "°C" : "°F"}
      </div>

      <p className="font-bold">Feels like {Math.round(weather.main.feels_like)} {units === "metric" ? "°C" : "°F"}. {weather.weather[0].description}</p>
      <div className="inline-flex mt-4">
        <div className="inline-block border-l border-red-500 w-1 h-12 mr-3"></div>
        <div className="flex flex-col">
          <p>Wind Speed: {weather.wind.speed}m/s N</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      </div>
    </>
  );
};

export default DetailedWeatherInfo;