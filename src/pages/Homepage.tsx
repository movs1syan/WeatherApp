import WeatherPage from "../components/WeatherPage.tsx";
import useGeolocation from "../hooks/useGeolocation.ts";

const Homepage = () => {
  const coords = useGeolocation();

  return (
    <WeatherPage coords={coords} />
  );
};

export default Homepage;