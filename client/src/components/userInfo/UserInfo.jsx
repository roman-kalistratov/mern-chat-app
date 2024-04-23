import React from "react";
import UserInfoHeader from "./UserInfoHeader";
import Divider from "../Divider";

import { BiMessageAltDetail } from "react-icons/bi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { MdBlock, MdDelete } from "react-icons/md";

import { useAuthContext } from "../../context/AuthContext";
import useUserInfo from "../../zustand/useUserInfo";
import useConversation from "../../zustand/useConversation";

import useFavourite from "../../hooks/useFavourite";
import useGetFavorites from "../../hooks/useGetFavourite";
import useBlockUser from "../../hooks/useBlockUser";
import useDeleteUser from "../../hooks/useDeleteUser";

const UserInfo = () => {
  const { userInfo, setIsUserInfo, setUserInfo } = useUserInfo();
  const { setSelectedConversation } = useConversation();
  const { isLoading, addToFavourites, removeFavourite } = useFavourite();
  const { data: favourites } = useGetFavorites();
  const { blockUser, unBlockUser } = useBlockUser();
  const { authUser } = useAuthContext();
  const { deleteUser } = useDeleteUser();
  const isBlocked = authUser?.blockedUsers.includes(userInfo._id);

  const isFavourite =
    Array.isArray(favourites) &&
    favourites.some((favourite) => favourite._id === userInfo?._id);

  const handleAddTofavourite = async () => {
    if (isFavourite) {
      await removeFavourite(userInfo?._id);
    } else await addToFavourites(userInfo._id);
  };

  const handleMessage = () => {
    setSelectedConversation(userInfo);
    setIsUserInfo();

    // for mobile
    const messageContainer = document.getElementById("messageContainer");

    if (window.innerWidth <= 1024) {
      messageContainer.classList.remove("hidden");
      messageContainer.classList.add("flex");
    }
  };

  return (
    <div className="fixed z-20 xl:relative w-full top-0 lg:min-w-[300px] sm:right-0 sm:max-w-[280px] h-full flex flex-col border-l bg-white border-light p-5 dark:border-dark  dark:bg-dark3 overflow-auto pb-2">
      <UserInfoHeader
        userInfo={userInfo}
        setIsUserInfo={setIsUserInfo}
        setUserInfo={setUserInfo}
      />
      <div className="flex items-center justify-between">
        <div
          className="flex flex-col items-center justify-center pt-4 gap-2 cursor-pointer"
          onClick={() => handleMessage()}
        >
          <span className="p-2 bg-icon dark:bg-iconDark rounded-sm">
            <BiMessageAltDetail className=" text-iconLight dark:text-iconDark text-lg" />
          </span>
          <span className="text-xs text-light2 dark:text-dark2 font-semibold">
            MESSAGE
          </span>
        </div>

        <div className="flex flex-col items-center justify-center pt-4 gap-2 cursor-pointer">
          {isBlocked ? (
            <span
              className="p-2 bg-icon dark:bg-icon rounded-sm"
              onClick={() => unBlockUser(userInfo?._id)}
            >
              <MdBlock className=" text-iconLight dark:text-iconDark text-lg" />
            </span>
          ) : (
            <span
              className="p-2 bg-icon dark:bg-iconDark rounded-sm"
              onClick={() => blockUser(userInfo?._id)}
            >
              <MdBlock className=" text-iconLight dark:text-iconDark text-lg" />
            </span>
          )}
          <span className="text-xs text-light2 dark:text-dark2 font-semibold">
            {isBlocked ? "UNBLOCK" : "BLOCK"}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center pt-4 gap-2 cursor-pointer">
          <span
            className="p-2 bg-bgRed rounded-sm opacity-65"
            onClick={() => deleteUser(userInfo?._id)}
          >
            <MdDelete className=" text-dark text-lg" />
          </span>
          <span className="text-xs text-light2 dark:text-dark2 font-semibold">
            DELETE
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center pt-4 gap-2 cursor-pointer"
          onClick={handleAddTofavourite}
        >
          <div className="p-2 bg-icon dark:bg-iconDark rounded-sm">
            {isLoading ? (
              <span className="loading loading-spinner mx-auto bg-green loading-xs"></span>
            ) : isFavourite ? (
              <MdFavorite className=" text-iconLight dark:text-iconDark text-lg" />
            ) : (
              <MdFavoriteBorder className=" text-iconLight dark:text-iconDark text-lg" />
            )}
          </div>
          <span className="text-xs text-light2 dark:text-dark2 font-semibold">
            FAVOURITE
          </span>
        </div>
      </div>

      <Divider />
      <div className=" text-light dark:text-dark text-sm">
        <h3 className="font-semibold bg-light2 dark:bg-dark2 p-2">Status:</h3>
        <p className="mt-1 font-semibold dark:text-dark2">
          {userInfo?.status
            ? userInfo.status
            : "The user did not provide a status."}
        </p>

        <h3 className=" my-2 font-semibold bg-light2 dark:bg-dark2 p-2">
          Info:
        </h3>
        <ul className="flex flex-col items-start justify-start gap-2">
          <li>
            <p>NickName</p>
            <p className="font-semibold dark:text-dark2">
              {userInfo?.nickname}
            </p>
          </li>
          <li>
            <p>Email</p>
            <p className="font-semibold dark:text-dark2">
              {userInfo?.email
                ? userInfo.email
                : "The user did not provide an email."}
            </p>
          </li>
          <li>
            <p>Location</p>
            <p className=" font-semibold dark:text-dark2">
              {" "}
              {userInfo?.location
                ? userInfo.location
                : "The user did not provide a location."}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
