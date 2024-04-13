import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Themes = () => {
  const { theme, toggleTheme, updateThemeImage } = useTheme();

  const handleToggleTheme = (crntTheme) => {
    if (crntTheme === theme) return;
    toggleTheme();
  };

  return (
    <div className="p-5 flex flex-col text-sm text-light dark:text-dark">
      <div>
        <h3>Choose theme color :</h3>
        <div className="flex items-center justify-start gap-3 p-4">
          <span
            className="block rounded-full bg-light w-7 h-7 cursor-pointer"
            onClick={() => handleToggleTheme("light")}
          ></span>
          <span
            className="block rounded-full bg-dark2 w-7 h-7 cursor-pointer"
            onClick={() => handleToggleTheme("dark")}
          ></span>
        </div>
      </div>

      <div>
        <h3>Choose theme image:</h3>
        <div className="flex flex-wrap items-center justify-start gap-3 p-4">
          <span
            className={`block rounded-full bg-pattern1 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern1")}
          ></span>
          <span
            className={`block rounded-full bg-pattern2 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern2")}
          ></span>
          <span
            className={`block rounded-full bg-pattern3 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern3")}
          ></span>
          <span
            className={`block rounded-full bg-pattern4 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern4")}
          ></span>
          <span
            className={`block rounded-full bg-pattern5 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern5")}
          ></span>
          <span
            className={`block rounded-full bg-pattern6 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern6")}
          ></span>
          <span
            className={`block rounded-full bg-pattern7 w-7 h-7 border border-green dark:border-dark cursor-pointer`}
            onClick={() => updateThemeImage("pattern7")}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Themes;
