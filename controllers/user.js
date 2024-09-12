import User from "../models/user.js";

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

  const result = await User.create({
    firstName: body?.first_name,
    lastName: body?.last_name,
    email: body?.email,
    jobTitle: body?.job_title,
    gender: body?.gender,
    password: body?.password,
  });

  return res?.status(201).json({ msg: "success" });
};

export { getAllUser, getUserById, addUser };
