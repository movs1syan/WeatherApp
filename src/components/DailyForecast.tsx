import React, { useMemo } from 'react';
import type { ForecastData, WeatherData } from "../shared/types.ts";

interface DayForecastProps {
  forecast: ForecastData | null;
  selectedDay: string | null,
  setSelectedDay: (selectedDay: string | null) => void,
  setSelectedTime: (selectedTime: null) => void,
}

const DailyForecast: React.FC<DayForecastProps> = ({ forecast, selectedDay, setSelectedDay, setSelectedTime }) => {
  const groupedByDay = useMemo(() => {
    return forecast?.list?.reduce((group, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!group[date]) group[date] = [];
      group[date].push(item);

      return group;
    }, {} as Record<string, WeatherData[]>) || {}
  }, [forecast]);

  const fiveDays = useMemo(() => Object.entries(groupedByDay)
    .map(([date, forecasts]) => ({
      date,
      forecasts,
    })), [groupedByDay]);

  return (
    <div className="flex justify-between gap-10 mt-7">
      {fiveDays.map((day) => (
        <button
          key={day.date}
          className={`border-none transition-colors duration-100 bg-gray-100 p-2 rounded mb-2 w-full cursor-pointer ${day.date === selectedDay ? "bg-gray-300" : "hover:bg-gray-200"}`}
          onClick={() => {setSelectedDay(day.date); setSelectedTime(null)}}
        >
          {new Date(day.date).toLocaleDateString("hy-AM", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </button>
      ))}
    </div>
  );
};

export default DailyForecast;