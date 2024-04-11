import React from "react";
import SidebarHeader from "../sidebar/SidebarHeader";
import SearchInputUsers from "../sidebar/SearchInputUsers";
import Users from "./Users";

const UsersContainer = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <SidebarHeader title="Users" icon={false} />
      <SearchInputUsers />
      <Users />
    </div>
  );
};

export default UsersContainer;
