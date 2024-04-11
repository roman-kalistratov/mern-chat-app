import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BsChatSquareText, BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { RiContactsFill } from "react-icons/ri";
import { FiSettings, FiLogOut } from "react-icons/fi";
import useAppState from "../zustand/useAppState";
import { useTheme } from "../context/ThemeContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { setAppState } = useAppState();
  const { logout } = useLogout();

  return (
    <nav
      className="w-[75px] max-w-[75px] flex flex-col items-center justify-between h-screen bg-dark2
       border-r border-dark"
    >
      <div
        className="p-5 border-b border-dark text-menu cursor-pointer"
        onClick={() => setAppState("chats")}
      >
        <BsChatSquareText size={20} />
      </div>
      <ul className="flex h-full flex-col items-center gap-2 text-menu">
        {menuItems.map((item, index) => (
          <li
            className="p-3 cursor-pointer hover:bg-bgIconHover border-dark tooltip tooltip-right"
            data-tip={item.tip}
            key={index}
            onClick={() => setAppState(item.state)}
          >
            {item.icon}
          </li>
        ))}
      </ul>

      <div
        className="p-3 mb-4 cursor-pointer text-iconLight hover:bg-icon rounded-md tooltip tooltip-right"
        data-tip="theme"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <BsFillMoonStarsFill size={20} />
        ) : (
          <BsSun size={22} />
        )}
      </div>

      <div
        className="p-3 mb-4 cursor-pointer text-iconLight bg-icon hover:bg-iconHover rounded-md tooltip tooltip-right"
        data-tip="logout"
        onClick={() => logout()}
      >
        <FiLogOut size={20} />
      </div>
    </nav>
  );
};

export default Navbar;

const menuItems = [
  {
    icon: <FaRegUserCircle size={22} />,
    state: "profile",
    tip: "profile",
  },
  {
    icon: <BiConversation size={22} />,
    state: "chats",
    tip: "chats",
  },
  {
    icon: <RiContactsFill size={22} />,
    state: "users",
    tip: "users",
  },
  {
    icon: <FiSettings size={22} />,
    state: "settings",
    tip: "settings",
  },
];
