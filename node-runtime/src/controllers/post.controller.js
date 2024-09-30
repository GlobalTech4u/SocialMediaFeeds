import path from "path";
import fs from "fs";
import { promisify } from "util";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { cloudinary } from "../utils/cloudinary.util.js";

const readFile = promisify(fs.readFile);

const getAllUserPosts = async (req, res) => {
  const userId = req?.params?.userId;

  return await Post.find({ userId: userId })
    .sort({ updatedAt: -1 })
    .then((posts) =>
      res?.status(200)?.json({
        posts: posts,
        error: null,
        message: "",
      })
    )
    .catch((error) =>
      res?.status(400)?.json({
        posts: null,
        error: error,
        message: "Post not found, please share new posts",
      })
    );
};

const getPostByPostId = async (req, res) => {
  // Implement the check to make sure the post is by user requesting the post
  const userId = req?.params?.userId;
  const postId = req?.params?.postId;

  return await Post.findById(postId)
    .then((post) =>
      res?.status(200)?.json({
        post: post,
        error: null,
        message: "",
      })
    )
    .catch((error) =>
      res?.status(400)?.json({
        post: null,
        error: error,
        message: "Post not found",
      })
    );
};

const getLatestPostForFeeds = async (req, res) => {
  // Implement the logic to get latest feeds from the people in users folloing list
};

const addPost = async (req, res) => {
  const content = req?.body?.content;
  const userId = req?.params?.userId;

  let postAttachments = [];

  const user = await User?.findById(req?.params?.userId);

  if (req.files) {
    await Promise.all(
      req?.files?.["postAttachments[]"]?.map(async (file) => {
        const filePath = path.join(
          "/SOCIALMEDIAFEEDS/node-runtime/assets",
          file?.filename
        );
        const fileBuffer = await readFile(filePath);
        const base64Image = fileBuffer.toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + base64Image;

        await cloudinary.uploader
          .upload(dataURI, {
            resource_type: "auto",
          })
          .then((image) => {
            postAttachments = [...postAttachments, image];
          })
          .catch((error) => {
            return res?.status(400)?.json({
              user: null,
              error: error,
              message: "failed to upload file",
            });
          });
      })
    );
  }

  return await Post.create({
    content: content,
    userId: userId,
    documents: postAttachments,
    profilePicture: user?.profilePicture,
    firstName: user?.firstName,
    lastName: user?.lastName,
  })
    .then((post) =>
      res?.status(201).json({ post: post, error: null, msg: "success" })
    )
    .catch((error) =>
      res?.status(400).json({
        post: null,
        error: error,
        msg: "Cannot create post. Please try again later",
      })
    );
};

const deletePost = async (req, res) => {
  const userId = req?.params?.userId;
  const postId = req?.params?.postId;
  return await Post.deleteOne({ _id: postId })
    .then((result) => {
      if (result?.acknowledged) {
        return res
          ?.status(204)
          .json({ post: postId, error: null, msg: "delete success" });
      }
    })
    .catch((error) => {
      return res?.status(400).json({
        post: null,
        error: error,
        msg: "Cannot delete post. Please try again later",
      });
    });
};

export { getAllUserPosts, getPostByPostId, addPost, deletePost };
