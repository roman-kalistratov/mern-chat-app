import React, { useState } from "react";
import toast from "react-hot-toast";
import useGetChats from "./useGetChats";

const useCreateContact = () => {
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetChats();

  const createUser = async ({ nickname }) => {
    const success = handleInputErrors({
      nickname,
    });

    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success("Contact successfully added.");
        refetch();
        // close the modal window
        document.getElementById("create-contact").close();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createUser,
  };
};

export default useCreateContact;

function handleInputErrors({ nickname }) {
  if (nickname.length < 3) {
    toast.error("Nickname must be at least 3 characters");
    return false;
  }

  return true;
}
