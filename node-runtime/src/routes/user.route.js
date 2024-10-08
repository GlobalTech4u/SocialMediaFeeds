import multer from "multer";
import express from "express";

import {
  getAllUser,
  getUserById,
  addUser,
  getUsersBySearch,
  followUser,
  unfollowUser,
} from "../controllers/user.controller.js";
import { upload } from "../utils/multer.util.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllUser)
  .post(function (req, res, next) {
    upload.single("profilePicture")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).send(err);
      } else if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      console.log("=> profile picture uploaded successfully");
      return next();
    });
  }, addUser);

// .post(upload.single("profilePicture"), addUser);

router.route("/:userId").get(getUserById);
router.route("/:userId/follow").put(followUser);
router.route("/:userId/unfollow").put(unfollowUser);
router.route("/search/:searchQuery").get(getUsersBySearch);

export default router;
