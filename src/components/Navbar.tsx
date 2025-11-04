import React from "react";
import { useUnits } from "../hooks/useUnits.tsx";
import MenuItem from "./MenuItem.tsx";
import {getUnits} from "../helpers/getUnits.ts";

const Navbar = () => {
  const { units, setUnits } = useUnits();

  const menu = [
    { path: "/", title: "Homepage" },
    { path: "/favourites", title: "Favourites" },
  ];

  const handleChange = (e: React.HTMLAttributes<HTMLInputElement>) => {
    setUnits(e.target.value);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-200 py-5 px-6 text-xl font-semibold mb-3">
      <div>
        {menu.map(item => (
          <MenuItem key={item.title} path={item.path} title={item.title} />
        ))}
      </div>
      <div className="flex outline outline-black rounded">
        <label className={`${units === "metric" ? "bg-red-500 text-white": ""} px-4 cursor-pointer transition-colors duration-300 rounded-l`}>
          <input name="metric" value="metric" type="radio" checked={units === "metric"} onChange={handleChange} className="hidden" />
          {getUnits("metric")}
        </label>
        <label className={`${units === "imperial" ? "bg-red-500 text-white": ""} px-4 cursor-pointer transition-colors duration-300 rounded-r`}>
          <input name="imperial" value="imperial" type="radio" checked={units === "imperial"} onChange={handleChange} className="hidden" />
          {getUnits("imperial")}
        </label>
      </div>
    </nav>
  );
};

export default Navbar;