import { Server } from "socket.io";
import http from "http";
import express from "express";
import UserModel from "../models/user.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing-started", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    socket.to(receiverSocketId).emit("typing-started-from-server", userId);
  });

  socket.on("typing-stoped", (receiverId) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    socket.to(receiverSocketId).emit("typing-stoped-from-server");
  });

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // to store the last online time in the database.
    if (userId !== "undefined") {
      await UserModel.findByIdAndUpdate(userId, { lastOnline: new Date() });
    }
  });
});

export { app, io, server };
