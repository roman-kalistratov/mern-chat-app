import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useFormik } from "formik";
import Divider from "../Divider";
import useCreateContact from "../../hooks/useCreateContact";
import useGetUsers from "../../hooks/useGetUsers";
import Users from "../Users/Users";
import useUserInfo from "../../zustand/useUserInfo";

const CreateContact = () => {
  const { loading, createUser } = useCreateContact();
  const { data: users } = useGetUsers();
  const { userInfo, setUserInfo, setIsUserInfo } = useUserInfo();

  const createUserForm = useFormik({
    initialValues: {
      nickname: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await createUser(values);
      createUserForm.resetForm();
    },
  });

  // searching for a user based on the entered data.
  useEffect(() => {
    if (createUserForm.values.nickname.length >= 3) {
      const user = users?.find((c) =>
        c.nickname
          .toLowerCase()
          .includes(createUserForm.values.nickname.toLowerCase())
      );

      if (user) {
        setUserInfo(user);
        setIsUserInfo(true);
      }
    }
  }, [createUserForm.values?.nickname]);

  // populating the input field with data from userInfo.nickname if any user has been selected.
  useEffect(() => {
    handleFieldChange(userInfo?.nickname || "");
  }, [userInfo]);

  const handleFieldChange = (value) => {
    createUserForm.setFieldValue("nickname", value);
  };

  return (
    <>
      <button
        className="p-2 cursor-pointer rounded-md bg-icon hover:bg-iconHover dark:bg-iconDark dark:hover:bg-iconHoverDark"
        onClick={() => document.getElementById("create-contact").showModal()}
      >
        <span className="text-sm text-iconLight dark:text-iconDark">
          <BiPlus />
        </span>
      </button>
      <dialog id="create-contact" className="modal max-w-[450px] m-auto">
        <div className="modal-box bg-white dark:bg-dark2 rounded-md p-0">
          <div className="w-full flex items-center justify-between p-3 bg-green dark:bg-dark3">
            <h2 className="text-dark font-semibold">Invite User</h2>
            <IoIosClose
              className="block cursor-pointer text-2xl text-dark  bg-iconDark hover:bg-iconHoverDark rounded-md"
              onClick={() => document.getElementById("create-contact").close()}
            />
          </div>

          <form
            onSubmit={createUserForm.handleSubmit}
            className="p-5 px-5 flex flex-col justify-start gap-3"
          >
            <label className=" pb-0 pl-1">
              <span className="text-light2 font-semibold dark:text-dark2 label-text">
                Nickname
              </span>
            </label>

            <input
              type="text"
              name="nickname"
              placeholder="Enter nickname"
              value={createUserForm.values.nickname}
              onChange={(e) => {
                handleFieldChange(e.target.value);
              }}
              error={createUserForm.errors.nickname}
              className="p-2 px-3 rounded-sm outline-none text-sm bg-dividerLight text-light dark:text-dark placeholder:text-light2 dark:placeholder:text-dark2 dark:bg-inputDark"
            />

            <p className="text-sm text-light2 dark:text-dark2">
              Add an existing user by nickname to your contact list.
              <br />
              Search term must be at least 3 characters long.
            </p>

            <div className="h-[200px] border border-light dark:border-dark overflow-auto">
              <Users />
            </div>

            <Divider />
            <button
              className="bg-icon dark:text-dark p-2 px-3 text-sm rounded-md outline-none"
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner text-light2 dark:text-dark2"></span>
              ) : (
                "Invite"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateContact;
