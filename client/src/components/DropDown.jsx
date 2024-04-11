import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { dropDown } from "../assets/animation";

const DropDown = ({ icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`p-2 cursor-pointer hover:bg-icon rounded-md dark:text-dark dark:hover:bg-iconDark relative ${
        isOpen && "bg-icon dark:bg-iconDark"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {Icon && <Icon />}
      {isOpen && (
        <motion.div
          ref={ref}
          className="absolute z-10 top-[50px] right-0 min-w-[200px]"
          {...dropDown}
        >
          <div className="p-4 bg-white dark:bg-dark rounded-md">{children}</div>
        </motion.div>
      )}
    </div>
  );
};

export default DropDown;
