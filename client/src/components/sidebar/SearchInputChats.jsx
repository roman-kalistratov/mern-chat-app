import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetChats from "../../hooks/useGetChats";
import toast from "react-hot-toast";

const SearchInputChats = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { data } = useGetChats();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = data?.find((c) =>
      c.nickname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full relative my-2"
      >
        <input
          type="text"
          placeholder="Search contacts…"
          className="w-full h-8 text-sm px-4 pr-8 outline-none rounded-md text-light dark:text-dark bg-inputLight dark:bg-dark2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="absolute right-2 ">
          <IoSearchSharp className="text-md text-light2 dark:text-dark2" />
        </button>
      </form>
    </div>
  );
};
export default SearchInputChats;
