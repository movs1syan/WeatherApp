import React, {useEffect, useRef, useState} from 'react';
import type {ForecastData, WeatherData} from "../shared/types.ts";
import {apiFetch} from "../shared/apiFetch.ts";
import Spinner from "./Spinner.tsx";
import DetailedWeatherInfo from "../components/DetailedWeatherInfo.tsx";
import DailyForecast from "../components/DailyForecast.tsx";
import HourlyForecast from "../components/HourlyForecast.tsx";
import {useUnits} from "../hooks/useUnits.tsx";

interface WeatherInfoProps {
  coords: Record<string, string | number> | null,
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ coords }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const formattedDate = useRef<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { units } = useUnits();

  useEffect(() => {
    (async () => {
      try {
        if (coords) {
          setIsLoading(true);
          const [currentData, forecastData] = await Promise.all([
            apiFetch("data", "2.5", "weather", {
              lat: coords.lat,
              lon: coords.lon,
              units,
            }),
            apiFetch("data", "2.5", "forecast", {
              lat: coords.lat,
              lon: coords.lon,
              units,
            }),
            // throw Error()
          ]);

          const groupedByDay =
            forecastData.list.reduce((group, item) => {
              const date = item.dt_txt.split(" ")[0];
              if (!group[date]) group[date] = [];
              group[date].push(item);

              return group;
            }, {} as Record<string, WeatherData[]>) || {};

          const fiveDays = Object.entries(groupedByDay)
            .map(([date, forecasts]) => ({
              date,
              forecasts,
            }));

          const getTimeFromLocation = (currentData.dt + currentData.timezone) * 1000;
          formattedDate.current = new Intl.DateTimeFormat("hy-AM", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          }).format(new Date(getTimeFromLocation));

          setWeather(currentData);
          setForecast(fiveDays);
        }
      } catch (error) {
        throw new Error(`HTTP Error! ${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [coords, units]);

  if (isLoading) {
    return (
      <div className="mt-10">
        <Spinner size="large" tip="Loading data..." />
      </div>
    );
  } else if (weather) {
    return (
      <>
        <div className="flex flex-col">
          <p className="text-red-600">{formattedDate.current}</p>
          <p className="font-semibold text-2xl">{weather.name}, {weather.sys.country}</p>
          <DetailedWeatherInfo weather={weather} units={units} />
          <h2 className="text-gray-700 text-2xl mt-5">5-day Forecast</h2>
        </div>

        <DailyForecast forecast={forecast} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setSelectedTime={setSelectedTime} units={units} />

        {selectedDay && (
          <HourlyForecast selectedDay={selectedDay} selectedTime={selectedTime} setSelectedTime={setSelectedTime} units={units} />
        )}

        {selectedTime !== null && (
          <DetailedWeatherInfo weather={selectedTime} units={units} />
        )}
      </>
    );
  }
};

export default WeatherInfo;