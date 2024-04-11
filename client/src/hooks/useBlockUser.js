import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useBlockUser = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    setAuthUser(user);
    localStorage.setItem("chat-user", JSON.stringify(user));
  }, [user]);

  const blockUser = async (userToBlockId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/users/blockuser/${userToBlockId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      } else {
        setUser(data.user);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const unBlockUser = async (userToUnBlockId) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/users/unblockuser/${userToUnBlockId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      localStorage.setItem("chat-user", JSON.stringify(data.user));

      if (data.error) {
        throw new Error(data.error);
      } else {
        setUser(data.user);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, blockUser, unBlockUser };
};

export default useBlockUser;
