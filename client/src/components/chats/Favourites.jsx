import React from "react";
import useGetFavorites from "../../hooks/useGetFavourite";
import Chat from "./Chat";

const Favourites = () => {
  const { data: favourites } = useGetFavorites();

  return (
    <>
      {favourites?.length > 0 && (
        <div className="py-4 flex flex-col overflow-auto">
          <h2 className="text-light px-4 dark:text-dark text-[11px] uppercase font-semibold">
            Favourites
          </h2>

          {favourites?.map((favourite, idx) => (
            <Chat
              key={favourite._id}
              chat={favourite}
              lastIdx={idx === favourite?.length - 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;
