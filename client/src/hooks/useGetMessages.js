import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const {
    data,
    isLoading: loading,
    isError,
    refetch,
  } = useQuery(
    "messages",
    async () => {
      try {
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);

        const data = await res.json();

        if (data.error) throw new Error(data.error);
        setMessages(data);
        return data;
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
        return null;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { messages, loading, isError, refetch };
};

export default useGetMessages;
