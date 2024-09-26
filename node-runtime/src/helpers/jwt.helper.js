import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

export { generateToken, verifyToken };
