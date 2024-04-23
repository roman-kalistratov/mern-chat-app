import React from "react";
import MessageContainer from "../components/messages/MessageContainer";
import UsersContainer from "../components/Users/UsersContainer";
import Settings from "../components/settings/Settings";
import Navbar from "../components/Navbar";
import Profile from "../components/profile/Profile";
import ChatsContainer from "../components/chats/ChatsContainer";
import UserInfo from "../components/userInfo/UserInfo";

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
    <div className="flex flex-col-reverse justify-between w-screen h-dvh lg:flex-row overflow-hidden">
      <Navbar />
      <main className="w-full lg:min-w-[280px] lg:max-w-[280px] flex flex-col lg:h-full border-r dark:border-dark dark:bg-dark3 h-full overflow-auto">
        {components[appState]}
      </main>

      <MessageContainer />
      {isUserInfo && <UserInfo />}
    </div>
  );
};

export default Home;
