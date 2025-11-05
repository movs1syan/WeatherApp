import React from 'react';
import type {UnitsType} from "../shared/types";
import { getUnits } from "../helpers/getUnits";
import { useUnits } from "../hooks/useUnits";

interface Props {
  mode: UnitsType,
}

const UnitsOption: React.FC<Props> = ({ mode }) => {
  const { units, setUnits } = useUnits();

  return (
    <label className={`px-4 cursor-pointer transition-colors duration-300 ${units === mode ? "bg-red-500 text-white": ""}`}>
      <input value={mode} type="radio" checked={units === mode} onChange={(e) => setUnits(e.target.value)} className="hidden" />
      {getUnits(mode)}
    </label>
  );
};

export default UnitsOption;