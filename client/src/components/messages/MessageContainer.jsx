import React, { useEffect } from "react";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/images/logo.png";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div
      className="hidden fixed z-10 h-full top-0 lg:flex lg:relative lg:min-w-[450px] w-full flex-col bg-white dark:bg-dark"
      id="messageContainer"
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <MessageHeader selectedConversation={selectedConversation} />
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { themeImage } = useTheme();
  return (
    <div
      className={`hidden lg:flex items-center justify-center w-full h-full bg-light dark:bg-dark2 bg-${themeImage}`}
    >
      <div className="px-4 text-center sm:text-lg lg:text-xl text-light dark:text-dark font-semibold flex flex-col items-center gap-2">
        <div className="p-5 bg-greenLight rounded-full">
          <img src={logo} alt="logo" className="w-14" />
        </div>
        <p>Welcome to Chat App </p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};
