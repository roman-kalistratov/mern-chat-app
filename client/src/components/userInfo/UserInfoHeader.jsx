import React from "react";
import { useSocketContext } from "../../context/SocketContext";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import DropDown from "../DropDown";
import avatar from "../../assets/images/avatar.png";
import useDeleteUser from "../../hooks/useDeleteUser";

const UserInfoHeader = ({ userInfo, setIsUserInfo, setUserInfo }) => {
  const { onlineUsers } = useSocketContext();
  const { deleteUser } = useDeleteUser();
  const isOnline = onlineUsers.includes(userInfo._id);

  const handleClose = () => {
    setIsUserInfo(false);
    setUserInfo(null);
  };

  return (
    <figure className="relative w-full transition-all duration-300">
      <img
        src={`${
          userInfo?.profilePic ? "/upload/" + userInfo.profilePic : avatar
        }`}
        className="w-full object-cover min-h-[270px] h-[270px]"
        alt="user pic"
      />
      <figcaption className="absolute z-50 w-full flex items-start justify-between top-4 px-4 text-xl text-white bottom-6">
        <IoClose className=" cursor-pointer" onClick={() => handleClose()} />
        <DropDown icon={BsThreeDotsVertical}>
          <div
            className="w-full flex items-center justify-between text-sm  text-colorRed hover:text-hoverColorRed "
            onClick={() => deleteUser(userInfo?._id)}
          >
            <span>Delete</span>
            <MdDelete className="text-[16px]" />
          </div>
        </DropDown>
      </figcaption>
      <figcaption className="absolute z-10 px-4 text-lg text-white bottom-6">
        <h2>{userInfo?.nickname}</h2>
        <h4 className="relative pl-4 text-sm ">
          <span
            className={`absolute align-middle top-[53%] transform -translate-y-[50%] left-0 w-2 h-2 rounded-full ${
              isOnline ? "bg-green" : "bg-light"
            } `}
          ></span>
          {isOnline ? "Online" : "Offline"}
        </h4>
      </figcaption>
      <div className="absolute top-0 left-0 w-full h-full inset-0 bg-gradient-to-b  bg-opacity-15 from-black via-transparent to-black opacity-60 "></div>
    </figure>
  );
};

export default UserInfoHeader;
