import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import { promisify } from "util";

import User from "../models/user.model.js";
import { cloudinary } from "../utils/cloudinary.util.js";

const readFile = promisify(fs.readFile);

const getUsersBySearch = async (req, res) => {
  const searchQuery = req?.params?.searchQuery;

  return await User?.find({
    $or: [
      {
        firstName: { $regex: searchQuery, $options: "i" },
      },
      {
        lastName: { $regex: searchQuery, $options: "i" },
      },
      {
        email: { $regex: searchQuery, $options: "i" },
      },
    ],
  })
    .then((users) =>
      res?.status(200)?.json({ users: users, error: null, message: "" })
    )
    .catch((error) =>
      res?.status(400)?.json({
        users: null,
        error: error,
        message: "Something went wrong. Please try again later",
      })
    );
};

const getAllUser = async (req, res) => {
  return await User?.find({})
    .then((users) =>
      res?.status(200)?.json({ users: users, error: null, message: "" })
    )
    .catch((error) =>
      res?.status(400)?.json({
        users: null,
        error: error,
        message: "Something went wrong. Please try again later",
      })
    );
};

const getUserById = async (req, res) => {
  return await User?.findById({ _id: req?.params?.userId })
    .then((user) =>
      res?.status(200)?.json({ user: user, error: null, message: "" })
    )
    .catch((error) =>
      res
        ?.status(400)
        ?.json({ user: null, error: error, message: "User not found" })
    );
};

const addUser = async (req, res) => {
  const body = req?.body;
  let profileImage = req?.file;

  if (req.file) {
    // const __uploads = path.join(process.cwd(), "uploads");
    // const filePath = path.join(__uploads, req?.file?.filename);
    // const fileBuffer = await readFile(filePath);
    const fileBuffer = req?.file?.buffer;
    const base64Image = fileBuffer.toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + base64Image;

    await cloudinary.uploader
      .upload(dataURI, {
        resource_type: "auto",
        public_id: `${Date.now()}-${req?.file?.originalname}`,
        display_name: req?.file?.originalname,
      })
      .then((image) => {
        profileImage = image;
      })
      .catch((error) => {
        return res?.status(400)?.json({
          user: null,
          error: error,
          message: "failed to create user",
        });
      });
  }

  const password = body?.password;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await User?.create({
    firstName: body?.firstName,
    lastName: body?.lastName,
    email: body?.email,
    jobTitle: body?.jobTitle,
    gender: body?.gender,
    password: hashedPassword,
    profilePicture: profileImage || null,
  })
    .then((user) =>
      res?.status(201)?.json({
        user: user,
        error: null,
        message: "user created successfully",
      })
    )
    .catch((error) =>
      res
        ?.status(400)
        ?.json({ user: null, error: error, message: "failed to create user" })
    );
};

const followUser = async (req, res) => {
  const userId = req?.params?.userId;
  const userIdToFollow = req?.body?.userId;
  const user = await User?.findById({ _id: userId });
  const userToFollow = await User?.findById({ _id: userIdToFollow });

  Promise.all([
    User?.updateOne(
      { _id: userId },
      {
        $push: {
          following: {
            _id: userToFollow?._id,
            firstName: userToFollow?.firstName,
            lastName: userToFollow?.lastName,
          },
        },
        $currentDate: { lastUpdated: true },
      }
    ),
    User?.updateOne(
      { _id: userIdToFollow },
      {
        $push: {
          followers: {
            _id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
          },
        },
        $currentDate: { lastUpdated: true },
      }
    ),
  ])
    .then((user) =>
      res?.status(200)?.json({
        user: user,
        error: null,
        message: "user updated successfully",
      })
    )
    .catch((error) =>
      res
        ?.status(400)
        ?.json({ user: null, error: error, message: "failed to update user" })
    );
};

const unfollowUser = async (req, res) => {
  const userId = req?.params?.userId;
  const userIdToUnfollow = req?.body?.userId;
  const user = await User?.findById({ _id: userId });
  const userToUnfollow = await User?.findById({ _id: userIdToUnfollow });

  Promise.all([
    User?.updateOne(
      { _id: userId },
      {
        $pull: {
          following: {
            _id: userToUnfollow?._id,
            firstName: userToUnfollow?.firstName,
            lastName: userToUnfollow?.lastName,
          },
        },
        $currentDate: { lastUpdated: true },
      }
    ),
    User?.updateOne(
      { _id: userIdToUnfollow },
      {
        $pull: {
          followers: {
            _id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
          },
        },
        $currentDate: { lastUpdated: true },
      }
    ),
  ])
    .then((user) =>
      res?.status(200)?.json({
        user: user,
        error: null,
        message: "user updated successfully",
      })
    )
    .catch((error) =>
      res
        ?.status(400)
        ?.json({ user: null, error: error, message: "failed to update user" })
    );
};

export {
  getAllUser,
  getUserById,
  addUser,
  getUsersBySearch,
  followUser,
  unfollowUser,
};
