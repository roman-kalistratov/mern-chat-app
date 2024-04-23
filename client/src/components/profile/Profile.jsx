import React, { useState } from "react";
import bg_profile from "../../assets/images/bg_profile.webp";
import ProfileImage from "./ProfileImage";
import ProfileField from "./ProfileField";
import { useAuthContext } from "../../context/AuthContext";
import useUpdateUser from "../../hooks/useUpdateUser";
import { useFormik } from "formik";
import { IoLocationOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsChatQuote } from "react-icons/bs";
import toast from "react-hot-toast";

const Profile = () => {
  const { authUser } = useAuthContext();
  const { updateUser } = useUpdateUser();
  const [profileImage, setProfileImage] = useState(null);

  const [editing, setEditing] = useState({
    nickname: false,
    status: false,
    email: false,
    location: false,
  });

  const toggleEdit = (type) => {
    setEditing((prevEditing) => ({
      ...prevEditing,
      [type]: !prevEditing[type],
    }));
  };

  const signupForm = useFormik({
    initialValues: {
      nickname: authUser?.nickname || "",
      status: authUser?.status || "",
      email: authUser?.email || "",
      location: authUser?.location || "",
    },
    onSubmit: async (values) => {
      if (!authUser.isUpdate) {
        toast.error("You can only update users created by you.");
        return;
      }
      const data = new FormData();

      if (profileImage) {
        data.append("image", profileImage);
      }

      data.append("data", JSON.stringify(values));

      await updateUser(data, values.email);

      setProfileImage(null);
    },
  });

  const handleBlur = (type) => {
    toggleEdit(type);
    signupForm.handleSubmit();
  };

  const handleImageChange = (image) => {
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png",
      "image/webp",
    ];
    if (image) {
      if (image.size > 1500000) {
        toast.error("Maximum allowed image size is 1.5 MB.");
      } else if (!SUPPORTED_FORMATS.includes(image.type)) {
        toast.error("Not a valid image type.");
      } else {
        setProfileImage(image);
        signupForm.handleSubmit();
      }
    } else {
      setProfileImage(null);
    }
  };

  return (
    <>
      <div
        className="w-full h-[150px]"
        style={{
          background: `url(${bg_profile}) no-repeat center/cover`,
        }}
      >
        <h4 className="text-lg text-dark capitalize font-semibold p-4">
          Profile
        </h4>
      </div>

      <div className="flex flex-col items-center -mt-14 gap-2 pb-8">
        <ProfileImage handleImageChange={handleImageChange} />

        <h4 className="text-light font-semibold dark:text-dark">
          {authUser?.nickname}
        </h4>
        <h5 className=" text-light2 dark:text-dark2 text-sm -mt-2 break-all px-4 capitalize">
          {authUser?.status}
        </h5>
      </div>

      <form
        className="text-light dark:text-dark2"
        onSubmit={signupForm.handleSubmit}
      >
        <ProfileField
          label="Nickname"
          name="nickname"
          type="text"
          icon={<FaRegUser />}
          value={signupForm.values.nickname}
          editing={editing.nickname}
          onChange={signupForm.handleChange}
          onBlur={() => handleBlur("nickname")}
          toggleEdit={() => toggleEdit("nickname")}
        />

        <ProfileField
          label="Status"
          name="status"
          type="text"
          icon={<BsChatQuote />}
          value={signupForm.values.status}
          editing={editing.status}
          onChange={signupForm.handleChange}
          onBlur={() => handleBlur("status")}
          toggleEdit={() => toggleEdit("status")}
        />
        <ProfileField
          label="Email"
          name="email"
          type="email"
          icon={<MdAlternateEmail />}
          value={signupForm.values.email}
          editing={editing.email}
          onChange={signupForm.handleChange}
          onBlur={() => handleBlur("email")}
          toggleEdit={() => toggleEdit("email")}
        />
        <ProfileField
          label="Location"
          name="location"
          type="text"
          icon={<IoLocationOutline />}
          value={signupForm.values.location}
          editing={editing.location}
          onChange={signupForm.handleChange}
          onBlur={() => handleBlur("location")}
          toggleEdit={() => toggleEdit("location")}
        />
      </form>
    </>
  );
};

export default Profile;
