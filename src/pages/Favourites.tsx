import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useCity} from "../providers/CityProvider.tsx";
import {apiFetch} from "../shared/apiFetch.ts";

const key = import.meta.env.VITE_API_KEY;

const Favourites = () => {
  const [favourites, setFavourites] = useState<Record<string, any>[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [serachResult, setSearchResult] = useState([]);
  const { setCity } = useCity();

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favorites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const handleSearch = async () => {
    const searchingQuery = inputRef.current?.value || "";

    if (!searchingQuery) return;

    try {
      const data = await apiFetch("geo", "1.0", "direct", {q: searchingQuery, limit: 5});
      setSearchResult(data);
    } catch (error) {
      throw new Error (`Error: ${error}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }

    if (inputRef.current?.value === "") {
      setSearchResult([]);
    }
  };

  const onAdd = (item: Record<string, any>) => {
    const updated = [...favourites, item];
    setFavourites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const onDelete = (key: number) => {
    const filtered = favourites.filter(item => item.lon !== key);
    setFavourites(filtered);
    localStorage.setItem("favorites", JSON.stringify(filtered));
  };

  return (
    <>
      <div className="flex gap-5 mt-6">
        <input
          className="flex-1 border-2 rounded border-gray-200 py-1 px-4"
          placeholder="Search for cities . . ."
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-3 rounded-md cursor-pointer active:bg-blue-700"
        >
          Search
        </button>
      </div>

      {serachResult.length > 0 && (
        <div className="mt-4 space-y-2">
          {serachResult.map((item: Record<string, any>) => (
            <div key={item.lat} className="flex items-center gap-5">
              <div className="border-none bg-gray-100 py-2 px-5 inline-block rounded">{item.name} {item.country}</div>
              {favourites.some(fav => fav.name === item.name && fav.country === item.country) ? (
                <div className="flex gap-3 items-center border-2 border-blue-500 bg-gray-300 text-blue-500 py-2 px-3 rounded-md">
                  Added
                </div>
              ) : (
                <button className="flex gap-3 items-center bg-blue-500 text-white py-2 px-3 rounded-md cursor-pointer active:bg-blue-700" onClick={() => onAdd(item)}>Add</button>
              )}
            </div>
          ))}
        </div>
      )}

      {favourites.length > 0 ? (
        <div className="mt-5">
          <h1 className="text-2xl">List of favourite cities</h1>
          <div className="mt-5 flex flex-col gap-3">
            {favourites.map((favourite) => (
              <div key={favourite.lon} className="flex items-center gap-5">
                <Link to={`/favourites/${favourite.name}`}>
                  <div
                    className="border-none bg-gray-100 py-2 px-5 inline-block rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300"
                    onClick={() => setCity({name: favourite.name, lat: favourite.lat, lon:favourite.lon})}
                  >
                    {favourite.name} {favourite.country}
                  </div>
                </Link>
                <button
                  className="bg-red-500 text-white py-2 px-3 rounded-md cursor-pointer active:bg-red-700"
                  onClick={() => onDelete(favourite.lon)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-2xl mt-3">List of favourite cities is empty</div>
      )}
    </>
  );
};

export default Favourites;