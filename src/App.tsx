import {useEffect, useState} from "react";
import {useCity} from "./providers/CityProvider.tsx";
import DetailedWeatherInfo from "./components/DetailedWeatherInfo";

const key = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BASE_URL;

interface WeatherData {
  name: string;
  dt: number;
  dt_txt: string;
  timezone: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
}

interface ForecastData {
  list: WeatherData[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

function App () {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [units, setUnits] = useState<string>("metric");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [selectedDay, setSelectedDay] = useState<WeatherData[]>([]);
  const [selectedTime, setSelectedTime] = useState<WeatherData | null>();
  const [chooseDay, setChooseDay] = useState<string>("");
  const [chooseTime, setChooseTime] = useState<number | null>();
  const [showForecast, setShowForecast] = useState(false);
  const { city } = useCity();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // TODO: create fetchInstance
        if (coords) {
          const currentRes = await fetch(`${baseURL}/weather?lat=${city.lat ? city.lat : coords.lat}&lon=${city.lon ? city.lon : coords.lon}&appid=${key}&units=${units}`);
          const currentData: WeatherData = await currentRes.json();
          setWeather(currentData);
        }
      } catch (error) {
        throw new Error(`HTTP Error! ${error}`);
      }
    })();
  }, [coords, units]);

  if (!weather) return <p className="mt-6">Loading . . .</p>;

  const changeFormat = () => {
    if (units === "metric") {
      setUnits("imperial");
    } else {
      setUnits("metric");
    }
  };

  const getForecast = async () => {
    setShowForecast(true);
    try {
      if (coords) {
        const forecastRes = await fetch(`${baseURL}/forecast?lat=${city.lat ? city.lat : coords.lat}&lon=${city.lon ? city.lon : coords.lon}&appid=${key}&units=${units}`);
        const forecastData = await forecastRes.json();
        setForecast(forecastData);
      }
    } catch (err) {
      throw new Error(`HTTP Error! ${err}`);
    }
  };

  const groupedByDay = forecast?.list.reduce((group, item) => {
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
      <div className="flex justify-between gap-20">
        <div className="flex flex-col">
          <p className="text-red-600">{formattedDate}</p>
          <p className="font-semibold text-2xl">{city.name ? city.name : weather.name}, {weather.sys.country}</p>

          <DetailedWeatherInfo weather={weather} units={units} changeFormat={changeFormat} />
          <h2 className="text-gray-700 text-xl mt-5 cursor-pointer" onClick={getForecast}>5-day Forecast</h2>
        </div>
        {showForecast && !forecast ? (<p className="mt-6">Loading...</p>) : (
          <div className="flex-1">
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
              <div className="flex justify-between mt-5">
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
                      <div className="text-center font-bold">{Math.round(day.main.temp)} {units === "metric" ? "°C" : "°F"}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {selectedTime && (
              <DetailedWeatherInfo weather={selectedTime} units={units} changeFormat={changeFormat} />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App;