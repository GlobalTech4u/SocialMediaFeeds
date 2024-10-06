import express from "express";

import {
  getAllUserPosts,
  getPostByPostId,
  addPost,
  deletePost,
  getLatestPostForFeeds,
} from "../controllers/post.controller.js";
import { upload } from "../utils/multer.util.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllUserPosts)
  .post(upload.fields([{ name: "postAttachments[]", maxCount: 12 }]), addPost);

router.route("/newsfeed").get(getLatestPostForFeeds);

router.route("/:postId").get(getPostByPostId).delete(deletePost);

export default router;
