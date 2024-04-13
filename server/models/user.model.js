import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "",
    },
    status: {
      type: String,
    },
    location: {
      type: String,
    },
    lastOnline: {
      type: Date,
      default: Date.now,
    },
    contacts: {
      type: [String],
    },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDelete: {
      type: Boolean,
      default: true,
    },
    isUpdate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
