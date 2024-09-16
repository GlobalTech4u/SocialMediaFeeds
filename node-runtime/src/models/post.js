import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: { type: String },
    likedBy: [String],
    image: {
      type: String,
    },
    comments: [
      {
        user: { type: String },
        content: { type: String },
        atDateAndTime: { type: String },
        likedBy: [String],
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;
