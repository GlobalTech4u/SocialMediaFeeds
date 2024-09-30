import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String },
    userId: { type: String },
    profilePicture: {},
    firstName: { type: String },
    lastName: { type: String },
    likedBy: [String],
    documents: [],
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
