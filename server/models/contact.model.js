// import mongoose from "mongoose";

// var contactSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     contacts: [
//       {
//         id: Number,
//         fullName: String,
//         nickname: String,
//         email: String,
//         location: String,
//         profilePic: String,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Contact", contactSchema);
import mongoose from "mongoose";

var contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
