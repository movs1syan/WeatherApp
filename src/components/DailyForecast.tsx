import React from 'react';
import type { UnitsType, ForecastData, ForecastItemData } from "../shared/types";
import {getUnits} from "../helpers/getUnits";

interface DayForecastProps {
  forecast: ForecastData | null;
  selectedDay: ForecastItemData | null,
  setSelectedDay: (selectedDay: ForecastItemData | null) => void,
  setSelectedTime: (selectedTime: null) => void,
  units: UnitsType,
}

const DailyForecast: React.FC<DayForecastProps> = ({ forecast, selectedDay, setSelectedDay, setSelectedTime, units }) => {
  return (
    <div className="flex justify-between gap-10 mt-7">
      {forecast?.map((day) => {
        let temps: number[] = [];
        day.forecasts.map((item) => {
          temps.push(item.main.temp);
        });

        return (
          <div
            key={day.date}
            className={`border-none text-center transition-colors duration-100 bg-gray-100 p-2 rounded mb-2 w-full cursor-pointer ${selectedDay !== null && day.date === selectedDay.date ? "bg-gray-300" : "hover:bg-gray-200"}`}
            onClick={() => {setSelectedDay(day); setSelectedTime(null)}}
          >
            <div className="font-semibold">
              {new Date(day.date).toLocaleDateString("hy-AM", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div>{Math.round(Math.max(...temps))} / {Math.round(Math.min(...temps))} {getUnits(units)}</div>
          </div>
        )}
      )}
    </div>
  );
};

export default DailyForecast;