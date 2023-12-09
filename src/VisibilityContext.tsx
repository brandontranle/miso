import React, { createContext, useContext, useState } from "react";

interface VisibilityContextData {
  showWeather: boolean;
  setShowWeather: React.Dispatch<React.SetStateAction<boolean>>;
  showClock: boolean;
  setShowClock: React.Dispatch<React.SetStateAction<boolean>>;
  showQuote: boolean;
  setShowQuote: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultVisibilityContext: VisibilityContextData = {
  showWeather: true,
  setShowWeather: () => {},
  showClock: true,
  setShowClock: () => {},
  showQuote: true,
  setShowQuote: () => {},
};

const VisibilityContext = createContext<VisibilityContextData>(
  defaultVisibilityContext
);

export const useVisibility = () => useContext(VisibilityContext);

interface VisibilityProviderProps {
  children: React.ReactNode;
}

export const VisibilityProvider: React.FC<VisibilityProviderProps> = ({
  children,
}) => {
  const [showWeather, setShowWeather] = useState(true);
  const [showClock, setShowClock] = useState(true);
  const [showQuote, setShowQuote] = useState(true);

  return (
    <VisibilityContext.Provider
      value={{
        showWeather,
        setShowWeather,
        showClock,
        setShowClock,
        showQuote,
        setShowQuote,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};
