import WeatherInfo from "../components/WeatherInfo";
import useGeolocation from "../hooks/useGeolocation";

const Homepage = () => {
  const coords = useGeolocation();

  return (
    <WeatherInfo coords={coords} />
  );
};

export default Homepage;