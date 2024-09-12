import Post from "../models/post.js";

const getAllPostByUserId = async (req, res) => {
  const body = req?.body;

  const posts = await Post.find({ userId: body?.userId });
  return res.json(posts);
};

const getPostByPostId = async (req, res) => {
  const post = await Post.findById(req?.params?.id);

  if (post) {
    return res.json(post);
  }

  return res.json({ error: true, status: "Post not found" });
};

const getFeed = async (req, res) => {
  // Implement the logic to get latest feeds from the people in users folloing list
};

const addPost = async (req, res) => {
  const body = req?.body;

  const result = await Post.create({
    content: body?.content,
    userId: body?.userId,
  });

  return res?.status(201).json({ msg: "success" });
};

export { getAllPostByUserId, getPostByPostId, addPost };
