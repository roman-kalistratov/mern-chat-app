import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useGetUsers from "./useGetUsers";
import useUserInfo from "../zustand/useUserInfo";
import useConversation from "../zustand/useConversation";
import useGetChats from "./useGetChats";
import useGetFavorites from "./useGetFavourite";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const { refetch: refetchUsers } = useGetUsers();
  const { userInfo, setIsUserInfo } = useUserInfo();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { refetch: refetchChats } = useGetChats();
  const { refetch: refetchFavourites } = useGetFavorites();

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/users/${userId}`, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      } else {
        // close sidebar userInfo if it's open
        userInfo && setIsUserInfo();
        selectedConversation && setSelectedConversation(null);
        toast.success(data.message);
        refetchUsers();
        refetchChats();
        refetchFavourites();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteUser };
};

export default useDeleteUser;
