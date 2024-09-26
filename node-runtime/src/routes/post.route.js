import express from "express";

import {
  getAllUserPosts,
  getPostByPostId,
  addPost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/").get(getAllUserPosts).post(addPost);

router.route("/:postId").get(getPostByPostId);

export default router;
