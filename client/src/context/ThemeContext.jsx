import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  const [themeImage, setThemeImage] = useState(() => {
    const storedImage = localStorage.getItem("theme-image");
    return storedImage || "pattern1";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  const updateThemeImage = (newImage) => {
    setThemeImage(newImage);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("theme-image", themeImage);
  }, [themeImage]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, themeImage, updateThemeImage }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
