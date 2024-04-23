import React from "react";
import logo from "../assets/images/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { BiConversation } from "react-icons/bi";
import { RiContactsFill } from "react-icons/ri";
import { FiSettings, FiLogOut } from "react-icons/fi";
import useAppState from "../zustand/useAppState";
import { useTheme } from "../context/ThemeContext";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { appState, setAppState } = useAppState();
  const { logout } = useLogout();

  return (
    <nav
      className="border-t w-full lg:border-t-0 lg:w-[75px] lg:max-w-[75px] py-2 lg:py-0 lg:h-screen flex lg:flex-col items-center justify-between bg-dark2
       lg:border-r border-dark"
    >
      <div
        className="hidden h-[61px] lg:block p-4 cursor-pointer"
        onClick={() => setAppState("chats")}
      >
        <img src={logo} alt="logo" className=" min-w-[25px]" />
      </div>
      <ul className="flex w-full h-full lg:flex-col items-center justify-around gap-2 text-dark2">
        {menuItems.map((item, index) => (
          <li
            className={`p-3 cursor-pointer hover:bg-bgIconHover border-dark relative lg:tooltip lg:tooltip-right ${
              appState === item.state && "text-menu"
            } `}
            data-tip={item.tip}
            key={index}
            onClick={() => setAppState(item.state)}
          >
            {item.icon}
            {appState === item.state && (
              <div className="absolute top-0 left-[50%] lg:top-[50%] transform -translate-x-[50%] lg:-translate-y-[50%] lg:left-full w-1/2 h-[2px] lg:h-1/2 lg:w-[2px] bg-green"></div>
            )}
          </li>
        ))}

        <div
          className="lg:mt-auto p-3 lg:mb-4 cursor-pointer text-iconLight hover:bg-icon rounded-lg lg:tooltip tooltip-right"
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
          className="p-2 lg:p-3 lg:mb-4 cursor-pointer text-iconLight bg-icon hover:bg-iconHover rounded-lg lg:tooltip tooltip-right"
          data-tip="logout"
          onClick={() => logout()}
        >
          <FiLogOut size={20} />
        </div>
      </ul>
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
