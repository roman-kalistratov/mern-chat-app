import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import fileMiddleware from "../middleware/multer.middleware.js";

import {
  createContact,
  removeContact,
  blockUser,
  unBlockUser,
  getUsers,
  getContacts,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", protectRoute, createContact);
router.post("/blockuser/:contactId", protectRoute, blockUser);
router.get("/", protectRoute, getContacts);
router.get("/all", protectRoute, getUsers);
router.delete("/unblockuser/:contactId", protectRoute, unBlockUser);
router.delete("/:contactId", protectRoute, deleteUser);
router.delete("/removeContact/:contactId", protectRoute, removeContact);
router.post(
  "/update",
  protectRoute,
  fileMiddleware.single("image"),
  updateUser
);

export default router;
