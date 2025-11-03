import React, {useEffect, useMemo, useState} from 'react';
import type {ForecastData, UnitsType, WeatherData} from "../shared/types.ts";
import {apiFetch} from "../shared/apiFetch.ts";
import DetailedWeatherInfo from "../components/DetailedWeatherInfo.tsx";
import DailyForecast from "../components/DailyForecast.tsx";
import HourlyForecast from "../components/HourlyForecast.tsx";
import {Link} from "react-router-dom";

const WeatherPage = ({ coords, mode="home" }: { lat: number, lon: number }) => {
  const [units, setUnits] = useState<UnitsType>("metric");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (coords) {
          const currentData: WeatherData = await apiFetch("data", "2.5", "weather", {
            lat: coords.lat,
            lon: coords.lon,
            units: units
          });
          setWeather(currentData);

          const forecastData = await apiFetch("data", "2.5", "forecast", {
            lat: coords.lat,
            lon: coords.lon,
            units: units,
          });
          setForecast(forecastData);
        }
      } catch (error) {
        throw new Error(`HTTP Error! ${error}`);
      }
    })();
  }, [coords, units]);

  const selectedHour = useMemo(() => {
    if (!selectedTime || !forecast) return null;
    return forecast.list.find(hour => hour.dt === selectedTime) || null;
  }, [selectedTime, forecast]);

  const changeFormat = () => {
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  if (!weather) return <p className="mt-6">Loading . . .</p>;

  const getTimeFromLocation = (weather.dt + weather.timezone) * 1000;
  const formattedDate = new Intl.DateTimeFormat("hy-AM", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(getTimeFromLocation));

  return (
    <>
      <div className="flex flex-col">
        {mode === "favourite" && (
          <Link to="/favourites">
            <div className="text-gray-700 text-2xl my-2 cursor-pointer">Back to Favourites</div>
          </Link>
        )}
        <p className="text-red-600">{formattedDate}</p>
        <p className="font-semibold text-2xl">{weather.name}, {weather.sys.country}</p>

        <DetailedWeatherInfo weather={weather} units={units} />
        <div
          className="text-red-500 text-xl cursor-pointer w-fit mt-5"
          onClick={changeFormat}
        >
          Change to {units === "metric" ? "Fahrenheit" : "Celsius"}
        </div>

        <h2 className="text-gray-700 text-2xl mt-5">5-day Forecast</h2>
      </div>
      {forecast ? (
        <DailyForecast forecast={forecast} setSelectedDay={setSelectedDay} setSelectedTime={setSelectedTime} />
      ) : (
        <p className="mt-6">Loading...</p>
      )}

      {selectedDay && (
        <HourlyForecast forecast={forecast} selectedDay={selectedDay} selectedTime={selectedTime} setSelectedTime={setSelectedTime} units={units} />
      )}

      {selectedHour && (
        <DetailedWeatherInfo weather={selectedHour} units={units} />
      )}
    </>
  );
};

export default WeatherPage;