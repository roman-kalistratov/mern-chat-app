import React from "react";

const ThreeDotsWave = () => {
  return (
    <div className="flex justify-center items-center   ">
      <span className="block text-light dark:text-dark">typing</span>
      <div className="flex justify-center gap-[2px] ml-[2px] mt-2 ">
        <div className="h-[2px] w-[2px] bg-dark2 dark:bg-light  rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-[2px] w-[2px] bg-dark2  dark:bg-light rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-[2px] w-[2px] bg-dark2 dark:bg-light rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ThreeDotsWave;
