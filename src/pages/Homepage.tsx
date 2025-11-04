import WeatherInfo from "../components/WeatherInfo.tsx";
import useGeolocation from "../hooks/useGeolocation.ts";

const Homepage = () => {
  const coords = useGeolocation();

  return (
    <WeatherInfo coords={coords} />
  );
};

export default Homepage;