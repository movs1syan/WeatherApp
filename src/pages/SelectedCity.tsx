import WeatherInfo from "../components/WeatherInfo.tsx";
import {Link, useParams} from "react-router-dom";
import {apiFetch} from "../shared/apiFetch.ts";
import { useState, useEffect } from "react";

const SelectedCity = () => {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const { city } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("geo", "1.0", "direct", {q: city});
        setCoords({
          lat: res[0].lat,
          lon: res[0].lon,
        })
      } catch (error) {
        console.error(`Failed fetching: ${error}`);
      }
    })();
  }, [city]);

  return (
    <>
      <Link to="/favourites">
        <div className="text-gray-700 text-2xl my-2 cursor-pointer">Back to Favourites</div>
      </Link>
      {coords.lat && coords.lon && <WeatherInfo coords={coords} />}
    </>
  );
};

export default SelectedCity;