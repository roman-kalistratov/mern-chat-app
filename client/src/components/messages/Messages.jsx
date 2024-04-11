import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";
import { useTheme } from "../../context/ThemeContext";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Messages = () => {
  const { messages, loading, refetch } = useGetMessages();
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const { themeImage } = useTheme();
  const lastMessageRef = useRef();
  const isBlocked = authUser?.blockedUsers.includes(selectedConversation._id);
  useListenMessages();

  // If the conversation chat is changed, it updates the message data.
  useEffect(() => {
    refetch();
  }, [selectedConversation]);

  // scroll to last message
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div
      className={`p-4 flex-1 overflow-auto h-full w-full bg-iconHover dark:bg-dark2 bg-${themeImage} bg-opacity-20`}
    >
      {!loading &&
        messages?.length > 0 &&
        Object.entries(groupedMessages).map(([date, messages]) => (
          <div className="text-center" key={date}>
            <span className="text-xs bg-green text-dark p-2 px-4 uppercase dark:text-dark dark:bg-dark3 rounded-md">
              {date}
            </span>
            {messages.map((message) => (
              <div key={message._id} ref={lastMessageRef}>
                <Message message={message} />
              </div>
            ))}

            {isBlocked && (
              <span className="text-xs bg-bgRed text-dark p-2 px-4 uppercase dark:text-dark dark:bg-dark3 rounded-md">
                User is Blocked
              </span>
            )}
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages?.length === 0 && (
        <p className="text-center text-light dark:text-dark">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
