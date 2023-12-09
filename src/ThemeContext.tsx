import React, { createContext, useContext, useState } from "react";

const defaultContext = {
  theme: "light", // Default theme
  toggleTheme: () => {}, // Placeholder function
};

const ThemeContext = createContext(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
