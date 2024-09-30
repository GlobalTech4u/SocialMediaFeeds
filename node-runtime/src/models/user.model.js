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
    profilePicture: {},
    followers: {
      type: [],
    },
    following: {
      type: [],
    },
    blocked: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const User = mongoose.model("user", userSchema);

export default User;
