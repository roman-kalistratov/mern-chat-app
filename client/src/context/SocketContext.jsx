import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [typingUserId, setTypingUserId] = useState(null);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://mern-chat-app-s9eg.onrender.com/", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  useEffect(() => {
    socket?.on("typing-started-from-server", (receiverId) => {
      setTypingUserId(receiverId);
      setTyping(true);
    });

    socket?.on("typing-stoped-from-server", () => {
      setTyping(false);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, typingUserId, onlineUsers, typing }}
    >
      {children}
    </SocketContext.Provider>
  );
};
