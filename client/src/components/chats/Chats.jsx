import useGetChats from "../../hooks/useGetChats";
import useGetFavorites from "../../hooks/useGetFavourite";
import Chat from "./Chat";

const Chats = () => {
  const { data: chats, isLoading } = useGetChats();
  const { data: favourites } = useGetFavorites();

  // Check if favourites data is available
  const favouritesIDs =
    favourites?.length > 0 ? favourites.map((favourite) => favourite._id) : [];

  // Filter chats to remove duplicates
  const filteredChats = chats?.filter((chat) =>
    favouritesIDs ? !favouritesIDs.includes(chat._id) : true
  );

  return (
    <div className="py-4">
      {filteredChats?.length > 0 ? (
        <>
          <h2 className="text-light px-4 dark:text-dark text-[11px] uppercase font-semibold">
            Chats
          </h2>

          {filteredChats?.map((chat, idx) => (
            <Chat
              key={chat._id}
              chat={chat}
              lastIdx={idx === filteredChats?.length - 1}
            />
          ))}
        </>
      ) : (
        <p className="text-light dark:text-dark text-center">Chats not found</p>
      )}

      {isLoading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Chats;
