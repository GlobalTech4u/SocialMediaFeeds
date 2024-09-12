import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    blocked: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
