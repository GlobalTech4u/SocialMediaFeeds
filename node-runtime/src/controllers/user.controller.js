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
  let profileImage;

  if (req.file) {
    const filePath = path.join(
      "/SOCIALMEDIAFEEDS/node-runtime/assets",
      req?.file?.filename
    );
    const fileBuffer = await readFile(filePath);
    const base64Image = fileBuffer.toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + base64Image;

    await cloudinary.uploader
      .upload(dataURI, {
        resource_type: "auto",
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
  const userToFollow = await User?.findById({ _id: userIdToFollow });

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
  )
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

export { getAllUser, getUserById, addUser, getUsersBySearch, followUser };
