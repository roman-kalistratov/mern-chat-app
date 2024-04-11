import React from "react";
import MessageContainer from "../components/messages/MessageContainer";
import UsersContainer from "../components/Users/UsersContainer";
import Settings from "../components/settings/Settings";
import Navbar from "../components/Navbar";
import Profile from "../components/profile/Profile";
import ChatsContainer from "../components/chats/ChatsContainer";
import useUserInfo from "../zustand/useUserInfo";
import useAppState from "../zustand/useAppState";

const Home = () => {
  const { appState } = useAppState();
  const { isUserInfo } = useUserInfo();

  const components = {
    chats: <ChatsContainer />,
    profile: <Profile />,
    users: <UsersContainer />,
    settings: <Settings />,
  };

  return (
    <div className="flex w-screen h-screen m-auto overflow-auto relative">
      <Navbar />
      <div className="w-1/4 max-w-[300px] flex flex-col h-full border-r dark:border-dark dark:bg-dark3">
        {components[appState]}
      </div>

      <MessageContainer />
      {isUserInfo && <UserInfo />}
    </div>
  );
};

export default Home;
