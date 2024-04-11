import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import sendMessageSound from "../assets/sound/sendMessage.mp3";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        const sound = new Audio(sendMessageSound);
        sound.play();
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
