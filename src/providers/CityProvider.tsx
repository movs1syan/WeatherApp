import { createContext, useContext, useState, type ReactNode } from 'react';

interface CityContextType {
  city: Record<string, string | number>;
  setCity: (city: Record<string, number>) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<Record<string, string | number>>({});

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }

  return context;
};