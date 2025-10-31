import { useState, useEffect } from "react";
import {useCity} from "../providers/CityProvider.tsx";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  }[];
  wind: { speed: number; deg: number; };
  dt_txt: string;
}

interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

const key = import.meta.env.VITE_API_KEY;

const DaysForecast = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [selectedDay, setSelectedDay] = useState<ForecastItem[]>([]);
  const [selectedTime, setSelectedTime] = useState<ForecastItem | null>();
  const [chooseDay, setChooseDay] = useState<string>("");
  const [chooseTime, setChooseTime] = useState<number | null>();
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false);
  const { city } = useCity();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`);
        const data: ForecastData = await res.json();

        setForecast(data);
      } catch (err) {
        throw new Error(`HTTP error! ${err}`);
      }
    })();
  }, []);

  if (!forecast) return <p className="mt-6">Loading . . .</p>;

  const groupedByDay = forecast.list.reduce((group, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!group[date]) group[date] = [];
    group[date].push(item);

    return group;
  }, {} as Record<string, ForecastItem[]>);

  const fiveDays = Object.entries(groupedByDay)
    .map(([date, forecasts]) => ({
      date,
      forecasts,
    }));

  const celsiusToFahrenheit = (c: number) => (c * 9) / 5 + 32;

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-2xl mb-3">5-day forecast in <span className="text-red-500">{forecast.city.name}</span></h2>
      {fiveDays.map((day) => (
        <button
          key={day.date}
          className={`border-none transition-colors duration-100 bg-gray-100 p-2 rounded mb-2 w-full cursor-pointer ${day.date === chooseDay ? "bg-gray-300" : "hover:bg-gray-200"}`}
          onClick={() => {setSelectedDay(day.forecasts); setSelectedTime(null); setChooseDay(day.date); setChooseTime(null)}}
        >
          {new Date(day.date).toLocaleDateString("hy-AM", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </button>
      ))}

      {selectedDay && (
        <div className="flex justify-evenly mt-5">
          {selectedDay.map(day => {
            const time = new Date(day.dt_txt).toLocaleTimeString("hy-AM", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={day.dt}
                className={` p-2 cursor-pointer hover:text-white  ${day.dt === chooseTime ? "bg-red-500 text-white" : "hover:bg-red-400"} transition-colors duration-100 rounded`}
                onClick={() => {setSelectedTime(day); setChooseTime(day.dt)}}
              >
                {time}
                <div className="text-center font-bold">{!isFahrenheitMode ? `${Math.round(day.main.temp)} °C` : `${Math.round(celsiusToFahrenheit(day.main.temp))} °F` }</div>
              </div>
            )
          })}
        </div>
      )}

      {selectedTime && (
        <div className="flex flex-col gap-2 mt-5">
          <div className="text-5xl my-3">
            {!isFahrenheitMode ? `${Math.round(selectedTime.main.temp)} °C` : `${Math.round(celsiusToFahrenheit(selectedTime.main.temp))} °F` }
            <p
              className="text-red-500 text-sm cursor-pointer w-fit"
              onClick={() => setIsFahrenheitMode(!isFahrenheitMode)}
            >
              {isFahrenheitMode ? "to Celsius" : "to Fahrenheit"}
            </p>
          </div>
          <p className="font-bold">Feels like {!isFahrenheitMode ? `${Math.round(selectedTime.main.feels_like)} °C` : `${Math.round(celsiusToFahrenheit(selectedTime.main.feels_like))} °F` }. {selectedTime.weather[0].description}</p>
          <div className="inline-flex">
            <div className="inline-block border-l border-red-500 w-1 h-12 mr-3"></div>
            <div className="flex flex-col">
              <p>Wind Speed: {selectedTime.wind.speed}m/s</p>
              <p>Humidity: {selectedTime.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaysForecast;