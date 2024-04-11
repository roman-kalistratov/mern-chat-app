import React from "react";
import { FaCamera } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import avatar from "../../assets/images/avatar.png";
import serverURI from "../../config";

const ProfileImage = ({ handleImageChange }) => {
  const { authUser } = useAuthContext();

  const handleChange = (event) => {
    handleImageChange(event.target.files[0]);
  };

  return (
    <div className="relative">
      <img
        src={`${
          authUser?.profilePic
            ? serverURI + "/uploads/" + authUser.profilePic
            : avatar
        }`}
        alt="user-avatar"
        className=" w-[100px] h-[100px] object-cover bg-light dark:bg-dark rounded-full border-2 border-light dark:border-dark p-1"
      />
      <div className="absolute bottom-1 right-1 border p-1.5 cursor-pointer rounded-full text-light bg-light text-sm">
        <label htmlFor="upload-photo">
          <div style={{ cursor: "pointer" }}>
            <FaCamera />
          </div>
        </label>
        <input
          type="file"
          id="upload-photo"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ProfileImage;
