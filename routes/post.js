import express from "express";

import {
  getAllPostByUserId,
  getPostByPostId,
  addPost,
} from "../controllers/post.js";

const router = express.Router();

router.route("/").get(getAllPostByUserId).post(addPost);

router.route("/:id").get(getPostByPostId);

export default router;
