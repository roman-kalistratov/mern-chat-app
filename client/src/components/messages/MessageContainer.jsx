import React, { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className={`md:min-w-[450px] w-full flex flex-col dark:bg-dark`}>
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
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full bg-light dark:bg-dark2">
      <div className="px-4 text-center sm:text-lg md:text-xl text-light dark:text-dark font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋{authUser?.fullName} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
