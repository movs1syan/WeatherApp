import {createContext, type ReactNode, useState} from "react";
import type { UnitsType } from "../shared/types";

interface UnitsProps {
  units: UnitsType,
  setUnits: (units: UnitsType) => void;
}

export const UnitsContext = createContext<UnitsProps | null>(null);

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<UnitsType>("metric");

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};