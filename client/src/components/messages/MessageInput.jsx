import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "emoji-picker-react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { formatFileSize } from "../../utils/formatFileSize";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);

  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const [typingTimeout, settypingTimeout] = useState(null);

  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");

  const handleEmojiPickerHideShow = () => {
    setIsEmojiPicker(!isEmojiPicker);
  };

  // adds emojis to the current text.
  const handleEmojiClick = (e) => {
    let newMessage = message;
    newMessage += e.emoji;
    setMessage(newMessage);
    setIsEmojiPicker(false);
  };

  // closes the emoji panel when typing text.
  //socets of typing start and end
  const handleSetMessage = (e) => {
    isEmojiPicker && setIsEmojiPicker(!isEmojiPicker);
    setMessage(e.target.value);
    const receiverId = selectedConversation?._id;
    socket.emit("typing-started", receiverId);

    if (typingTimeout) clearTimeout(typingTimeout);

    settypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped", receiverId);
      }, 1000)
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
  };

  const handleRemoveSelectedFile = () => {
    const fileInput = document.getElementById("upload-file");
    fileInput.value = null;
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!file && !message) return;
    if (file) {
      if (file.size > 1024 * 1024 * 1.5) {
        toast.error("file too large. Max size 1.5MB");
        return;
      }
      formData.append("file", file);
    }
    if (message) {
      formData.append("message", message);
    }
    await sendMessage(formData);
    setMessage("");
    handleRemoveSelectedFile();
  };

  return (
    <>
      {file && (
        <div className="flex items-center justify-between p-1.5 w-[99.888%] text-xs bg-light border border-green  dark:bg-iconHoverDark dark:text-dark2">
          <div className="">
            <p>You have selected</p>
            <a
              href={previewSrc}
              download={previewSrc}
              className="text-light dark:text-dark pointer-events-none"
            >
              <div className="flex items-center justify-start gap-2">
                <span>{file?.name}</span>
                <span>{formatFileSize(file?.size)}</span>
              </div>
            </a>
          </div>
          <div
            className="text-light dark:text-dark text-lg cursor-pointer"
            onClick={() => handleRemoveSelectedFile()}
          >
            <IoClose />
          </div>
        </div>
      )}

      <form
        className="flex items-center justify-center py-4 px-4  gap-2 relative bg-light dark:bg-dark2"
        onSubmit={handleSubmit}
      >
        <div className="p-2 rounded-md cursor-pointer text-iconLight hover:bg-iconHover bg-icon dark:text-dark dark:hover:bg-iconHoverDark dark:bg-iconDark">
          <label htmlFor="upload-file">
            <div style={{ cursor: "pointer" }}>
              <MdAttachFile className="text-xl" />
            </div>
          </label>
          <input
            type="file"
            id="upload-file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="p-2 rounded-md cursor-pointer hover:bg-icon dark:hover:bg-iconDark text-dark2">
          <FaRegSmile className="text-xl" onClick={handleEmojiPickerHideShow} />

          {isEmojiPicker && (
            <EmojiPicker
              onEmojiClick={(e) => handleEmojiClick(e)}
              searchDisabled
              emojiStyle="facebook"
              lazyLoadEmojis="false"
              previewConfig={{
                showPreview: false,
              }}
              theme="dark"
              width="400px"
              height="500px"
              style={{
                position: "absolute",
                bottom: "105%",
                left: 14,
              }}
            />
          )}
        </div>
        <div className="w-full flex items-center justify-start gap-3">
          <input
            type="text"
            className="outline-none text-sm text-light dark:text-dark placeholder:text-light2 dark:placeholder:text-dark2 rounded-md w-full p-2.5 px-3  dark:bg-inputDark pr-9"
            placeholder="Enter message..."
            value={message}
            onChange={(e) => handleSetMessage(e)}
          />

          <button
            type="submit"
            className="p-2.5 rounded-md cursor-pointer text-iconLight hover:bg-iconHover bg-icon dark:text-dark dark:hover:bg-iconHoverDark dark:bg-iconDark"
          >
            {loading ? (
              <div className="loading loading-spinner loading-xs"></div>
            ) : (
              <BsSend />
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default MessageInput;
