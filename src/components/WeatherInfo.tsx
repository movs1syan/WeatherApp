import React, {useEffect, useRef, useState} from 'react';
import type {WeatherData, ForecastData, ForecastItemData} from "../shared/types";
import {apiFetch} from "../shared/apiFetch";
import Spinner from "./ui/Spinner";
import DetailedWeatherInfo from "./DetailedWeatherInfo";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import {useUnits} from "../hooks/useUnits";
import {useNotification} from "../hooks/useNotification";

interface WeatherInfoProps {
  coords: Record<string, string | number> | null,
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ coords }) => {
  const { units } = useUnits();
  const { notify } = useNotification();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData>([]);
  const [selectedDay, setSelectedDay] = useState<ForecastItemData | null>(null);
  const [selectedTime, setSelectedTime] = useState<WeatherData | null>(null);
  const [showDailyForecast, setShowDailyForecast] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formattedDate = useRef<string>("");

  useEffect(() => {
    (async () => {
      try {
        if (coords) {
          setIsLoading(true);
          const [localWeatherData, forecastData] = await Promise.all([
            apiFetch({ lat: coords.lat, lon: coords.lon, units },"weather"),
            apiFetch({ lat: coords.lat, lon: coords.lon, units }, "forecast"),
          ]);

          const groupedByDay: Record<string, WeatherData[]> =
            forecastData.list.reduce((group: Record<string, WeatherData[]>, item: WeatherData ) => {
              const date = item.dt_txt.split(" ")[0];
              if (!group[date]) group[date] = [];
              group[date].push(item);

              return group;
            }, {} as Record<string, WeatherData[]>) || {};

          const fiveDaysForecast = Object.entries(groupedByDay)
            .map(([date, forecasts]) => ({
              date,
              forecasts,
            }));

          const selectedDayForecast = fiveDaysForecast.find(day => day.date === selectedDay?.date)
          if(selectedDayForecast) {
            setSelectedDay(selectedDayForecast)
            const selectedTimeForecast = selectedDayForecast.forecasts.find(time => time.dt === selectedTime?.dt)

            if(selectedTimeForecast) {
              setSelectedTime(selectedTimeForecast)
            }
          }

          const getTimeFromLocation = (localWeatherData.dt + localWeatherData.timezone) * 1000;
          formattedDate.current = new Intl.DateTimeFormat("hy-AM", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          }).format(new Date(getTimeFromLocation));

          setWeather(localWeatherData);
          setForecast(fiveDaysForecast);

          // throw new Error ("Failed to get daily forecast");
        }
      } catch (error) {
        notify({
          type: "error",
          message: "Error!",
          description: `Data fetching failed: ${error}`,
        });
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

        <DailyForecast forecast={forecast} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setSelectedTime={setSelectedTime} setShowDailyForecast={setShowDailyForecast} units={units} />

        <HourlyForecast selectedDay={selectedDay} selectedTime={selectedTime} showDailyForecast={showDailyForecast} setSelectedTime={setSelectedTime} units={units} />


          <DetailedWeatherInfo weather={selectedTime} units={units} />

      </>
    );
  }
};

export default WeatherInfo;