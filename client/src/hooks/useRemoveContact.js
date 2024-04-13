import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import useGetChats from "./useGetChats";
import useGetFavorites from "./useGetFavourite";

const useRemoveContact = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation } = useConversation();
  const { refetch: refetchChats } = useGetChats();
  const { refetch: refetchFavourites } = useGetFavorites();

  const removeContact = async (contactIdToRemove) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/users/removeContact/${contactIdToRemove}`
      );

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success(data.message);
        setSelectedConversation(null);
        refetchChats();
        refetchFavourites();

        // for mobile
        if (window.innerWidth <= 768) {
          const messageContainer = document.getElementById("messageContainer");
          messageContainer.classList.add("hidden");
          messageContainer.classList.remove("flex");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeContact };
};

export default useRemoveContact;
