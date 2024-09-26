import express from "express";

import {
  getAllUser,
  getUserById,
  addUser,
} from "../controllers/user.controller.js";
import { upload } from "../utils/multer.util.js";

const router = express.Router();

router
  .route("/")
  .get(getAllUser)
  .post(upload.single("profilePicture"), addUser);

router.route("/:userId").get(getUserById);

export default router;
