import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import UserModel from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // check if the contact is in the blocked list.
    const receiver = await UserModel.findById(receiverId);
    if (receiver.blockedUsers.includes(senderId)) {
      return res.status(400).json({ error: "User blocked you." });
    }

    // check if the user is in the blocked list.
    const sender = await UserModel.findById(senderId);
    if (sender.blockedUsers.includes(receiverId)) {
      return res.status(400).json({ error: "User is blocked." });
    }

    // search for existing Conversation between 2 users
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    if (req.file) {
      const { filename, path, mimetype, size } = req.file;
      const file = newMessage.file;

      file.fileName = filename;
      file.filePath = path;
      file.fileMimetype = mimetype;
      file.fileSize = size;
    }

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation?.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contactId } = req.params;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [userId, contactId] },
    });

    if (!conversation) {
      res.status(400).json({ error: "Chat not found" });
    }

    await MessageModel.deleteMany({ _id: { $in: conversation.messages } });

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await MessageModel.findOne({ _id: messageId });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    res.set({
      "Content-Type": message.file.fileMimetype,
    });

    res.sendFile(path.join(__dirname, "../..", message.file.filePath));
  } catch (error) {
    console.log("Error in downloadFile controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
