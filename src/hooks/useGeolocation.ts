import {useEffect, useState} from 'react';

const UseGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // TODO: can we do this before rendering?
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

  return coords;
};

export default UseGeolocation;