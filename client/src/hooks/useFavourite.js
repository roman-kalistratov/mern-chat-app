import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useGetFavorites from "./useGetFavourite";

const useAddToFavourite = () => {
  const [isLoading, setLoading] = useState(false);
  const { refetch } = useGetFavorites();

  const addToFavourites = async (userToAddId) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/favourite", { userToAddId });
      const data = res.data;

      if (data) {
        toast.success(data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setLoading(false);
  };

  const removeFavourite = async (userToRemoveId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/favourite/${userToRemoveId}`);
      const data = res.data;

      if (data) {
        toast.success(data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setLoading(false);
  };

  return { isLoading, addToFavourites, removeFavourite };
};

export default useAddToFavourite;
