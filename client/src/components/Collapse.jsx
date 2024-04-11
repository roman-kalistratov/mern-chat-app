import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const Collapse = ({ isOpen, toggleCollapse, title, icon, children }) => {
  return (
    <>
      <button
        className={`w-full border-t border-light dark:border-dark flex items-center py-3 px-6 text-light dark:text-dark text-sm justify-start gap-2 ${
          isOpen && "bg-greenLight dark:bg-dark2"
        } `}
        onClick={toggleCollapse}
      >
        <span>{icon}</span>
        <h3>{title}</h3>
        <span className=" ml-auto">
          <FaChevronDown
            className={`text-textPrimary duration-200 ${
              isOpen && "text-textSecondary rotate-180"
            } `}
          />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Collapse;
