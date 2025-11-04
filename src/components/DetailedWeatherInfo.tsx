import React from 'react';
import type { WeatherData } from "../shared/types.ts";
import {getIcon} from "../helpers/getIcon.ts";
import {getUnits} from "../helpers/getUnits.ts";

interface DetailedWeatherInfoProps {
  weather: WeatherData;
  units: string;
}

const DetailedWeatherInfo: React.FC<DetailedWeatherInfoProps> = ({ weather, units }) => {
  return (
    <>
      <div className="flex items-center text-5xl">
        <img src={getIcon(weather.weather[0].icon)} alt={weather.weather[0].description} className="w-15" />
        {Math.round(weather.main.temp)} {getUnits(units)}
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