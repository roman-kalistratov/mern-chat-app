import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useGetUsers from "../../hooks/useGetUsers";
import useUserInfo from "../../zustand/useUserInfo";

const SearchInputUsers = () => {
  const [search, setSearch] = useState("");
  const { data: users } = useGetUsers();
  const { setUserInfo, setIsUserInfo } = useUserInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const user = users?.find((c) =>
      c.nickname.toLowerCase().includes(search.toLowerCase())
    );

    if (user) {
      setUserInfo(user);
      setIsUserInfo(true);
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
export default SearchInputUsers;
