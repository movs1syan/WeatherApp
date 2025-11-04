import React from 'react';
import type { UnitsType, WeatherData } from "../shared/types.ts";
import {getIcon} from "../helpers/getIcon.ts";
import {getUnits} from "../helpers/getUnits.ts";

interface HourlyForecastProps {
  selectedDay: WeatherData | null,
  selectedTime: WeatherData | null,
  setSelectedTime: (selectedTime: any | null) => void,
  units: UnitsType,
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ selectedDay, selectedTime, setSelectedTime, units }) => {
  return (
    <div className="flex justify-around mt-5">
      {selectedDay.forecasts.map(hour => {
        const time = new Date(hour.dt_txt).toLocaleTimeString("hy-AM", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div
            key={hour.dt}
            className={`p-2 font-semibold cursor-pointer hover:text-white  ${selectedTime !== null && hour.dt === selectedTime.dt ? "bg-red-500 text-white" : "hover:bg-red-400"} transition-colors duration-100 rounded`}
            onClick={() => setSelectedTime(hour)}
          >
            {time}
            <img src={getIcon(hour.weather[0].icon)} alt={hour.weather[0].description} className="w-15" />
            <div className="text-center font-normal">{Math.round(hour.main.temp)} {getUnits(units)}</div>
          </div>
        )
      })}
    </div>
  );
};

export default HourlyForecast;