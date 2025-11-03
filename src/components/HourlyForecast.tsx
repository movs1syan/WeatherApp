import React, {useMemo} from 'react';
import type {WeatherData, UnitsType, ForecastData} from "../shared/types.ts";

interface HourlyForecastProps {
  forecast: ForecastData | null;
  selectedDay: string | null,
  selectedTime: number | null,
  setSelectedTime: (selectedTime: number | null) => void,
  units: UnitsType,
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast, selectedDay, selectedTime, setSelectedTime, units }) => {
  const selectedDayForecasts = useMemo(() => {
    if (!selectedDay || !forecast) return [];
    return forecast.list.filter(item => item.dt_txt.startsWith(selectedDay));
  }, [selectedDay, forecast]);

  return (
    <div className="flex justify-around mt-5">
      {selectedDayForecasts.map(hour => {
        const time = new Date(hour.dt_txt).toLocaleTimeString("hy-AM", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const iconCode = hour.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        return (
          <div
            key={hour.dt}
            className={`p-2 cursor-pointer hover:text-white  ${hour.dt === selectedTime ? "bg-red-500 text-white" : "hover:bg-red-400"} transition-colors duration-100 rounded`}
            onClick={() => setSelectedTime(hour.dt)}
          >
            {time}
            <img src={iconUrl} alt={hour.weather[0].description} className="w-15" />
            <div className="text-center font-bold">{Math.round(hour.main.temp)} {units === "metric" ? "°C" : "°F"}</div>
          </div>
        )
      })}
    </div>
  );
};

export default HourlyForecast;