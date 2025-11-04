import React from 'react';
import {getUnits} from "../helpers/getUnits.ts";

const UnitsOption = ({ units, setUnits, mode }) => {

  const handleChange = (e: React.HTMLAttributes<HTMLInputElement>) => {
    setUnits(e.target.value);
  };

  return (
    <label className={`${units === "metric" ? "bg-red-500 text-white": ""} px-4 cursor-pointer transition-colors duration-300 rounded-l`}>
      <input name="metric" value="metric" type="radio" checked={units === "metric"} onChange={handleChange} className="hidden" />
      {getUnits("metric")}
    </label>
  );
};

export default UnitsOption;