import UserModel from "../models/user.model.js";
import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import FavoriteModel from "../models/favorite.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await UserModel.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieving contact of a specific user.
export const getContacts = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await UserModel.findById(userId);

    let userContacts = [];

    user.contacts.forEach((contact) => {
      userContacts.push(contact);
    });

    const contacts = await UserModel.find({ _id: userContacts }).select(
      "-password -contacts"
    );

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error in getContacts: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createContact = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { nickname } = req.body;

    const contact = await UserModel.findOne({ nickname: nickname });
    if (!contact) {
      return res
        .status(400)
        .json({ error: "User with this nickname does not exist." });
    }

    // check if contact already exists
    const user = await UserModel.findById(userId);
    if (user.contacts.includes(contact._id)) {
      return res.status(400).json({
        error: "Contact with this nickname already in your contact list.",
      });
    }

    await UserModel.findByIdAndUpdate(userId, {
      $push: { contacts: contact._id },
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("Error in createContact: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeContact = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    if (!user) {
      return res.status(400).json({ error: "Unauthorized." });
    }

    if (!user.contacts.includes(contactId)) {
      const favourite = await FavoriteModel.findOne({ userId });
      const favouriteContactIndex = favourite.favouriteUsers.indexOf(contactId);
      favourite.favouriteUsers.splice(favouriteContactIndex, 1);
      await favourite.save();
    } else {
      const contactIndex = user.contacts.indexOf(contactId);
      user.contacts.splice(contactIndex, 1);
      await user.save();
    }

    return res.status(200).json({ message: "Chat removed successfully", user });
  } catch (error) {
    console.error("Error in deleteUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: contactId });

    if (!user) {
      return res.status(400).json({ error: "unauthorized." });
    }

    if (!user.isDelete) {
      return res
        .status(200)
        .json({ error: "You can only delete users created by you." });
    }

    const conversations = await ConversationModel.find({
      participants: contactId,
    });
    // delete all messages involving a user.
    for (const conversation of conversations) {
      await MessageModel.deleteMany({ _id: { $in: conversation.messages } });
    }
    // delete all conversations involving a user.
    await ConversationModel.deleteMany({ participants: userId });
    // delete all messages sent or received by the user.
    await MessageModel.deleteMany({
      $or: [{ senderId: contactId }, { receiverId: contactId }],
    });

    await UserModel.findByIdAndDelete(contactId);

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { contacts: contactId },
    });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { nickname, status, email, location } = JSON.parse(req.body.data);

  try {
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    if (!user.isUpdate) {
      return res
        .status(200)
        .json({ error: "You can only update users created by you." });
    }

    user.nickname = nickname;
    user.status = status;
    user.email = email;
    user.location = location;

    if (req.file) {
      user.profilePic = req.file.filename;
    }

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const blockUser = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId }).select("-password");
    const contact = await UserModel.findOne({ _id: contactId });

    if (!user) {
      return res.status(400).json({ error: "unauthorized." });
    }

    if (!contact) {
      return res.status(400).json({ error: "User not found." });
    }

    if (user.blockedUsers.includes(contactId)) {
      return res.status(400).json({ message: "User is already blocked." });
    }

    user.blockedUsers.push(contactId);
    await user.save();

    return res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    console.error("Error in blockedUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const unBlockUser = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId }).select("-password");

    if (!user) {
      return res.status(400).json({ error: "Unauthorized." });
    }

    if (!user.blockedUsers.includes(contactId)) {
      return res.status(400).json({ message: "Contact is not blocked." });
    }

    const contactIndex = user.blockedUsers.indexOf(contactId);

    user.blockedUsers.splice(contactIndex, 1);

    await user.save();

    return res
      .status(200)
      .json({ message: "User unblocked successfully", user });
  } catch (error) {
    console.error("Error in unblockUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
