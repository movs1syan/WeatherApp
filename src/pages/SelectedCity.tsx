import WeatherPage from "../components/WeatherPage.tsx";
import {useCity} from "../providers/CityProvider.tsx";

const SelectedCity = () => {
  const { city } = useCity();

  const coords = {
    lat: city.lat,
    lon: city.lon,
  }

  return (
    <WeatherPage coords={coords} mode="favourite" />
  );
};

export default SelectedCity;