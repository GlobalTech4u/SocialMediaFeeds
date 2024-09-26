import Post from "../models/post.model.js";

const getAllUserPosts = async (req, res) => {
  const userId = req?.params?.userId;

  return await Post.find({ userId: userId })
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
  const userId = req?.body?.userId;

  await Post.create({
    content: content,
    userId: userId,
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

export { getAllUserPosts, getPostByPostId, addPost };
