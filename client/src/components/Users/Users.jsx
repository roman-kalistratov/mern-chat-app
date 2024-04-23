import React, { useState, useEffect, useRef } from "react";
import {
  sortUsersByName,
  groupUsersByFirstLetter,
} from "../../utils/groupUsers";

import useUserInfo from "../../zustand/useUserInfo";
import Divider from "../Divider";
import avatar from "../../assets/images/avatar.png";
import useGetUsers from "../../hooks/useGetUsers";

const Users = () => {
  const { data: users, isLoading } = useGetUsers();
  const [nUsers, setNUsers] = useState([]);
  const { userInfo, isUserInfo, setUserInfo, setIsUserInfo } = useUserInfo();
  const findUserRef = useRef(null);

  useEffect(() => {
    // Sort users alphabetically by name
    if (users) {
      const sortedUsers = sortUsersByName(users);
      setNUsers(sortedUsers);
    } else return;
  }, [users]);

  // scrolling to the found user
  useEffect(() => {
    if (isUserInfo && userInfo && window.innerWidth > 1024) {
      findUserRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isUserInfo, userInfo]);

  // Grouping users by first letter of name
  const groupedUsers = groupUsersByFirstLetter(nUsers);

  // entering data and opening a component with user information.
  const handleClick = (user) => {
    setUserInfo(user);
    setIsUserInfo(true);
  };

  return (
    <>
      {users?.length > 0 ? (
        <div className="flex flex-col h-full pb-6 overflow-auto ">
          {Object.entries(groupedUsers).map(([letter, crntUsers]) => (
            <div key={letter} className="  dark:text-dark text-sm">
              <h2 className="font-semibold text-green px-3">{letter}</h2>
              <Divider />

              {crntUsers.map((user) => (
                <div
                  key={user._id}
                  ref={
                    isUserInfo && userInfo._id === user._id ? findUserRef : null
                  }
                  className={`flex items-center justify-start gap-2 p-3 px-6 hover:bg-bgHover hover:text-dark cursor-pointer ${
                    isUserInfo &&
                    userInfo._id === user._id &&
                    "bg-bgActive text-dark "
                  }`}
                  onClick={() => handleClick(user)}
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full border-2 border-green p-[2px]">
                      <img
                        src={`${
                          user?.profilePic
                            ? "/upload/" + user.profilePic
                            : avatar
                        }`}
                        className="rounded-full"
                        alt="user avatar"
                      />
                    </div>
                  </div>
                  {user?.nickname}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-light dark:text-dark text-center mt-4">
          Users not found
        </p>
      )}

      {isLoading && <span className="loading loading-spinner mx-auto"></span>}
    </>
  );
};

export default Users;
