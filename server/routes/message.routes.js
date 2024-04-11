import express from "express";
import {
  getMessages,
  sendMessage,
  deleteMessages,
  downloadFile,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import fileMiddleware from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.get("/download/:messageId", protectRoute, downloadFile);
router.post(
  "/send/:id",
  protectRoute,
  fileMiddleware.single("file"),
  sendMessage
);
router.delete("/:contactId", protectRoute, deleteMessages);

export default router;
