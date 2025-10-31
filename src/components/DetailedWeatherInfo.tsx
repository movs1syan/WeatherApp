import React from 'react';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

interface DetailedWeatherInfoProps {
  weather: WeatherData;
  units: string;
  changeFormat: () => void;
}

const DetailedWeatherInfo: React.FC<DetailedWeatherInfoProps> = ({ weather, units, changeFormat }) => {
  return (
    <>
      <div className="text-5xl my-3">
        {Math.round(weather.main.temp)} {units === "metric" ? "°C" : "°F"}
        <p
          className="text-red-500 text-sm cursor-pointer w-fit"
          onClick={changeFormat}
        >
          {units === "metric" ? "to Fahrenheit" : "to Celsius" }
        </p>
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