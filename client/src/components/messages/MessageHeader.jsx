import React, { useEffect, useState } from "react";
import serverURI from "../../config";
import { BsThreeDotsVertical, BsFillInfoCircleFill } from "react-icons/bs";
import { MdBlock, MdDelete, MdRemoveCircle } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useSocketContext } from "../../context/SocketContext";
import { lastOnline } from "../../utils/lastOnline";
import { useAuthContext } from "../../context/AuthContext";
import DropDown from "../DropDown";
import useUserInfo from "../../zustand/useUserInfo";
import avatar from "../../assets/images/avatar.png";
import useDeleteChat from "../../hooks/useDeleteChat";
import useBlockUser from "../../hooks/useBlockUser";
import ThreeDotsWave from "../ThreeDotsWave";
import useRemoveContact from "../../hooks/useRemoveContact";

const MessageHeader = ({ selectedConversation }) => {
  const { setUserInfo, setIsUserInfo } = useUserInfo();
  const { onlineUsers, typing } = useSocketContext();
  const { deleteChat } = useDeleteChat();
  const { removeContact } = useRemoveContact();
  const { blockUser, unBlockUser } = useBlockUser();
  const { authUser } = useAuthContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const onlineDate = lastOnline(selectedConversation.lastOnline);
  const isBlocked = authUser?.blockedUsers.includes(selectedConversation._id);

  const messageContainer = document.getElementById("messageContainer");
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setUserInfo(selectedConversation);
    setIsUserInfo(true);
  };

  const handleMobileClose = () => {
    messageContainer.classList.add("hidden");

    setIsHidden(true);
  };

  useEffect(() => {
    if (isHidden) {
      messageContainer.classList.add("hidden");
    }
  }, [isHidden]);

  return (
    <div className="px-2 lg:px-4 h-[61px] max-h-[61px] flex gap-2 items-center justify-between bg-light2">
      <span
        className="text-iconLight dark:text-dark text-lg cursor-pointer p-3 lg:hidden"
        onClick={() => handleMobileClose()}
      >
        <FaArrowLeft />
      </span>
      <div
        className="flex items-center justify-start gap-2 w-full cursor-pointer "
        onClick={handleClick}
      >
        <div className="rounded-full border-2 border-green p-[2px] relative">
          <img
            src={`${
              selectedConversation?.profilePic
                ? serverURI + "/uploads/" + selectedConversation?.profilePic
                : avatar
            }`}
            className="w-10 h-10 rounded-full object-cover"
            alt="user pic"
          />
        </div>
        <div className=" flex flex-col items-start justify-start">
          <span className="text-md md:text-lg leading-[1.3rem] font-medium text-light dark:text-dark">
            {selectedConversation?.nickname}
          </span>
          <div className="text-xs text-light2 font-semibold dark:text-dark2">
            {typing ? <ThreeDotsWave /> : isOnline ? "Online" : onlineDate}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-lg text-iconLight dark:text-iconDark">
        <button
          className="p-2  hover:bg-icon rounded-md dark:text-dark dark:hover:bg-iconDark"
          onClick={handleClick}
        >
          <BsFillInfoCircleFill className="text-md" />
        </button>

        <DropDown icon={BsThreeDotsVertical}>
          <ul className="flex flex-col justify-center items-start gap-3">
            {isBlocked ? (
              <li
                className="w-full flex flex-nowrap items-center justify-between text-sm text-green  hover:text-light2 dark:hover:text-dark2"
                onClick={() => unBlockUser(selectedConversation?._id)}
              >
                <p>Unblock {selectedConversation?.nickname}</p>
                <MdBlock className="text-[16px]" />
              </li>
            ) : (
              <li
                className="w-full flex flex-nowrap items-center justify-between text-sm text-light dark:text-dark hover:text-light2 dark:hover:text-dark2"
                onClick={() => blockUser(selectedConversation?._id)}
              >
                <p>Block {selectedConversation?.nickname}</p>
                <MdBlock className="text-[16px]" />
              </li>
            )}
            <li
              className="w-full flex items-center justify-between text-sm  text-colorRed hover:text-hoverColorRed "
              onClick={() => removeContact(selectedConversation?._id)}
            >
              <p>Remove Contact</p>
              <MdRemoveCircle className="text-[16px]" />
            </li>
            <li
              className="w-full flex items-center justify-between text-sm  text-colorRed hover:text-hoverColorRed "
              onClick={() => deleteChat(selectedConversation?._id)}
            >
              <p>Delete Chat</p>
              <MdDelete className="text-[16px]" />
            </li>
          </ul>
        </DropDown>
      </div>
    </div>
  );
};

export default MessageHeader;
