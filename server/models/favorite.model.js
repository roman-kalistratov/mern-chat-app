import mongoose from "mongoose";

var favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favouriteUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    count: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);
