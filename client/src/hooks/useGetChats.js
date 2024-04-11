import toast from "react-hot-toast";
import { useQuery } from "react-query";

const useGetChats = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "conversations",
    async () => {
      try {
        const res = await fetch("/api/users");

        const chats = await res.json();

        if (chats?.error) {
          throw new Error(chats.error);
        }

        return chats;
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
        return null;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useGetChats;
