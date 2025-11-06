import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import WeatherInfo from "../components/WeatherInfo";
import {apiFetch} from "../shared/apiFetch";
import {useNotification} from "../hooks/useNotification";

const SelectedCity = () => {
  const [coords, setCoords] = useState<Record<string, string | number>>({});
  const { city } = useParams();
  const { notify } = useNotification();

  useEffect(() => {
    getCoords().catch((error => {
      notify({
        type: "error",
        message: "Error!",
        description: `Data fetching failed: ${error}`,
      });
    }));
  }, []);

  const getCoords = async () => {
    if (city) {
      const res = await apiFetch({q: city}, "direct", "geo", "1.0");
      setCoords({
        lat: res[0].lat,
        lon: res[0].lon,
      })
    }
  };

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