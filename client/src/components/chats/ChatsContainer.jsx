import CreateContact from "../forms/CreateContact";
import SearchInputChats from "../sidebar/SearchInputChats";
import SidebarHeader from "../sidebar/SidebarHeader";
import Favourites from "./Favourites";
import Chats from "./Chats";

const ChatsContainer = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <SidebarHeader title="chats" icon={true} event={<CreateContact />} />
      <SearchInputChats />
      <Favourites />
      <Chats />
    </div>
  );
};
export default ChatsContainer;
