import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useGetMessages from "./useGetMessages";

const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetMessages();

  const deleteChat = async (userIdToDelete) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/messages/${userIdToDelete}`);

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success(data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteChat };
};

export default useDeleteChat;
