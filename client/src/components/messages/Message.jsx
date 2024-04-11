import serverURI from "../../config";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { MdAttachFile } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import avatar from "../../assets/images/avatar.png";
import download from "downloadjs";
import { formatFileSize } from "../../utils/formatFileSize";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);

  const chatClassName = fromMe ? "chat-end" : "chat-start";

  const profilePic = fromMe
    ? `${
        authUser?.profilePic
          ? serverURI + "/uploads/" + authUser.profilePic
          : avatar
      }`
    : `${
        selectedConversation?.profilePic
          ? serverURI + "/uploads/" + selectedConversation.profilePic
          : avatar
      }`;

  const bubbleBgColor = fromMe
    ? "bg-msgFromMe dark:bg-msgFromMeDark"
    : "bg-[#fff] dark:bg-dark";

  const shakeClass = message.shouldShake ? "shake" : "";

  const handleDownload = async (messageId) => {
    try {
      const result = await fetch(`/api/messages/download/${messageId}`);
      const blob = await result.blob();

      const split = message.file.filePath.split("/");
      const filename = split[split.length - 1];

      download(blob, filename, message.file.fileMimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <div className={`chat py-2 ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-7 rounded-full">
          <img alt="avatar" src={profilePic} />
        </div>
      </div>

      <div
        className={`chat-bubble flex flex-col gap-2 items-center justify-center max-w-[48%] text-left text-light2 dark:text-dark ${bubbleBgColor} ${shakeClass} rounded-md`}
      >
        {message?.file && (
          <>
            {message.file.fileMimetype &&
            message.file.fileMimetype.startsWith("image/") ? (
              <div
                className="cursor-pointer"
                onClick={() => handleDownload(message._id)}
              >
                <img
                  src={`${serverURI}/uploads/${message.file.fileName}`}
                  alt="upload-img"
                  className="max-w-[250px] rounded-md"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 border border-green rounded-md p-2 px-4">
                <div className="p-2 bg-greenLight rounded-md">
                  <MdAttachFile className="text-xl" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <span className="text-sm">{message.file.fileName}</span>
                  <span className="text-xs dark:text-dark2">
                    {formatFileSize(message.file.fileSize)}
                  </span>
                </div>
                <IoMdDownload
                  className="text-xl cursor-pointer"
                  onClick={() => handleDownload(message._id)}
                />
              </div>
            )}
          </>
        )}
        <div>{message.message}</div>
      </div>
      <div className="chat-footer opacity-70 flex gap-2 items-center text-light2 dark:text-dark2">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
