import express from "express";

import {
  getAllUser,
  getUserById,
  addUser,
  getUsersBySearch,
  followUser,
} from "../controllers/user.controller.js";
import { upload } from "../utils/multer.util.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllUser)
  .post(upload.single("profilePicture"), addUser);

router.route("/:userId").get(getUserById);
router.route("/:userId/follow").post(followUser);
router.route("/search/:searchQuery").get(getUsersBySearch);

export default router;
