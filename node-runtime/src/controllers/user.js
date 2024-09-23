import path from "path";
import { fileURLToPath } from "url";

import User from "../models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AssetsFolder = path.join(__dirname, "../../assets");

const getAllUser = async (req, res) => {
  const users = await User.find({});
  return res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req?.params?.id);

  if (user) {
    return res.json(user);
  }

  return res.json({ error: true, status: "User not found" });
};

const addUser = async (req, res) => {
  const body = req?.body;
  const { profilePicture } = req?.files;

  profilePicture.mv(path.join(AssetsFolder, profilePicture?.name));

  return await User.create({
    firstName: body?.firstName,
    lastName: body?.lastName,
    email: body?.email,
    jobTitle: body?.jobTitle,
    gender: body?.gender,
    password: body?.password,
    profilePicture: profilePicture?.name,
  })
    .then(() => res?.status(200).json({ message: "user created successfully" }))
    .catch((err) => {
      return res
        ?.status(400)
        .json({ message: "failed to create user", error: err });
    });
};

export { getAllUser, getUserById, addUser };
