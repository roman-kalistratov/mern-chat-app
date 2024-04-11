import { useQuery } from "react-query";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "users",
    async () => {
      try {
        const res = await fetch("/api/users/all");
        const users = await res.json();

        if (users?.error) {
          throw new Error(users.error);
        }

        return users;
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error}`);
        return null;
      }
    },
    { refetchOnWindowFocus: false }
  );

  return { data, isLoading, isError, refetch };
};

export default useGetUsers;
