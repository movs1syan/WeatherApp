import { UnitsContext } from "../providers/UnitsProvider.tsx";
import { useContext } from "react";

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used within a UnitProvider");
  }

  return context;
};