import React, { useState } from "react";
import { BiSolidBrightnessHalf } from "react-icons/bi";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import SidebarHeader from "../sidebar/SidebarHeader";
import Collapse from "../Collapse";
import Themes from "./Themes";
import avatar from "../../assets/images/avatar.png";
import useAppState from "../../zustand/useAppState";
import Notifications from "./Notifications";
import serverURI from "../../config";

const Settings = () => {
  const { authUser } = useAuthContext();
  const { setAppState } = useAppState();

  const [openCollapseIndex, setOpenCollapseIndex] = useState(null);
  const toggleCollapse = (index) => {
    setOpenCollapseIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <SidebarHeader title="Settings" icon={false} />
      <div
        className="flex items-center justify-start gap-3 p-4 cursor-pointer  dark:bg-dark hover:dark:bg-dark2"
        onClick={() => setAppState("profile")}
      >
        <img
          src={`${
            authUser?.profilePic
              ? serverURI + "/uploads/" + authUser.profilePic
              : avatar
          }`}
          alt="user-avatar"
          className=" w-[80px] h-[80px] object-cover bg-light dark:bg-dark rounded-full"
        />
        <div className="dark:text-dark">
          <h2>{authUser?.nickname}</h2>
          <h3 className="dark:text-dark2">{authUser?.status}</h3>
        </div>
      </div>

      <Collapse
        icon={<BiSolidBrightnessHalf />}
        title="Themes"
        isOpen={openCollapseIndex === 0}
        toggleCollapse={() => toggleCollapse(0)}
      >
        <Themes />
      </Collapse>

      <Collapse
        icon={<IoNotificationsOffOutline />}
        title="Notifications"
        isOpen={openCollapseIndex === 1}
        toggleCollapse={() => toggleCollapse(1)}
      >
        <Notifications />
      </Collapse>
    </>
  );
};

export default Settings;
