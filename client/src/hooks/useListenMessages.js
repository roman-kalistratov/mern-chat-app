import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useNotifications from "../zustand/useNotifications";
import useGetMessages from "./useGetMessages";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { refetch } = useGetMessages();
  const {
    notifications: { tonePath: tonePath },
    notifications: { tones: tone },
  } = useNotifications();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      if (tone) {
        const sound = new Audio(`${tonePath}`);
        sound.play();
      }
      refetch();
      setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
