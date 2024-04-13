import React from "react";

const SidebarHeader = ({ title, icon, event }) => {
  return (
    <div className="p-4 h-[61px] max-h-[61px] flex items-center justify-between px-4 border-b border-light dark:border-dark">
      <h4 className="text-lg text-light dark:text-dark capitalize font-semibold">
        {title}
      </h4>

      {icon && event}
    </div>
  );
};

export default SidebarHeader;
