import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res?.status(400)?.json({
      user: null,
      error: true,
      message: "Invalid username or password.",
    });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res?.status(400)?.json({
      user: null,
      error: true,
      message: "Invalid username or password.",
    });

  const token = generateToken(user?.id);
  user.token = token;

  res?.status(200)?.json({
    user: { ...user.toObject(), token: token },
    error: null,
    message: "User logged in successfully",
  });
};

export { loginUser };
