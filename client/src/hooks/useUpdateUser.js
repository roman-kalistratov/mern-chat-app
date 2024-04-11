import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateUser = async (data, email) => {
    const success = handleInputErrors(email);

    if (!success) return;
    setLoading(true);
    try {
      axios
        .post("/api/users/update", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          localStorage.setItem("chat-user", JSON.stringify(response.data));
          setAuthUser(response.data);
        });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateUser };
};
export default useUpdateUser;

function handleInputErrors(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  return true;
}
