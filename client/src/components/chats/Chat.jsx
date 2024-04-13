import serverURI from "../../config";
import { useSocketContext } from "../../context/SocketContext";
import { lastOnline } from "../../utils/lastOnline";
import useConversation from "../../zustand/useConversation";
import useUserInfo from "../../zustand/useUserInfo";
import avatar from "../../assets/images/avatar.png";
import ThreeDotsWave from "../ThreeDotsWave";

const Chat = ({ chat, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers, typing } = useSocketContext();
  const isSelected = selectedConversation?._id === chat._id;
  const isOnline = onlineUsers.includes(chat._id);
  const onlineDate = lastOnline(chat.lastOnline);
  const { isUserInfo, setIsUserInfo } = useUserInfo();

  const handleClick = () => {
    isUserInfo && setIsUserInfo();
    setSelectedConversation(chat);

    // for mobile
    if (window.innerWidth <= 1024) {
      const messageContainer = document.getElementById("messageContainer");
      messageContainer.classList.remove("hidden");
      messageContainer.classList.add("flex");
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 py-4 items-center text-light dark:text-dark hover:bg-bgHover text-sm hover:text-dark px-4 cursor-pointer  dark:hover:bg-bgActiveDark
				${isSelected ? "bg-bgActive text-dark dark:bg-dark2" : ""}
        ${!lastIdx && "border-b border-light dark:border-dark"}
			`}
        onClick={() => handleClick()}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 rounded-full">
            <img
              src={`${
                chat?.profilePic
                  ? serverURI + "/uploads/" + chat.profilePic
                  : avatar
              }`}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-3 items-center justify-between">
            <p className={`font-base ${isSelected ? " text-dark " : ""}`}>
              {chat.nickname}
            </p>

            <span
              className={`text-[11px] text-light2 font-semibold  dark:text-dark2 ${
                isSelected ? " text-dark" : ""
              }`}
            >
              {typing && isOnline ? (
                <ThreeDotsWave />
              ) : isOnline ? (
                "Online"
              ) : (
                onlineDate
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
