import { useQuery } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useGetFavorites = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "favourites",
    async () => {
      try {
        const response = await axios.get("/api/favourite");
        const favorites = response.data;

        if (favorites?.error) {
          throw new Error(favorites.error);
        }

        return favorites;
      } catch (error) {
        console.error(error);
        toast.error(`Error: ${error.message}`);
        return null;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useGetFavorites;
