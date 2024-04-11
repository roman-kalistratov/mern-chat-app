import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (values) => {
    const success = handleInputErrors(values);

    if (!success) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values,
        }),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      } else {
        toast.success("User successfully created.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signup,
  };
};

export default useSignup;

function handleInputErrors({ nickname, password, confirmPassword }) {
  if (!nickname || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (nickname.length < 3) {
    toast.error("Nickname must be at least 3 characters");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 3) {
    toast.error("Password must be at least 3 characters");
    return false;
  }

  return true;
}
