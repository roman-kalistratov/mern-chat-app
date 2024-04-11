import React from "react";
import serverURI from "../../config";
import { BsThreeDotsVertical, BsFillInfoCircleFill } from "react-icons/bs";
import { MdBlock, MdDelete } from "react-icons/md";
import { useSocketContext } from "../../context/SocketContext";
import { lastOnline } from "../../utils/lastOnline";
import { useAuthContext } from "../../context/AuthContext";
import DropDown from "../DropDown";
import useUserInfo from "../../zustand/useUserInfo";
import avatar from "../../assets/images/avatar.png";
import useDeleteChat from "../../hooks/useDeleteChat";
import useBlockUser from "../../hooks/useBlockUser";
import ThreeDotsWave from "../ThreeDotsWave";

const MessageHeader = ({ selectedConversation }) => {
  const { setUserInfo, setIsUserInfo } = useUserInfo();
  const { onlineUsers, typing } = useSocketContext();
  const { deleteChat } = useDeleteChat();
  const { blockUser, unBlockUser } = useBlockUser();
  const { authUser } = useAuthContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);
  const onlineDate = lastOnline(selectedConversation.lastOnline);
  const isBlocked = authUser?.blockedUsers.includes(selectedConversation._id);

  const handleClick = () => {
    setUserInfo(selectedConversation);
    setIsUserInfo(true);
  };

  return (
    <div className="px-4 h-[61px] max-h-[61px] flex items-center justify-between bg-light2">
      <div
        className="flex items-center justify-start gap-2 w-full cursor-pointer "
        onClick={handleClick}
      >
        <div className="rounded-full border-2 border-green p-[2px]">
          <img
            src={`${
              selectedConversation?.profilePic
                ? serverURI + "/uploads/" + selectedConversation.profilePic
                : avatar
            }`}
            className="w-10 h-10 rounded-full object-cover"
            alt="user pic"
          />
        </div>
        <div className="text-xs flex flex-col items-start justify-start">
          <span className="leading-[1.3rem] text-lg font-medium text-light dark:text-dark">
            {selectedConversation?.nickname}
          </span>
          <div className="text-light2 font-semibold dark:text-dark2">
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
