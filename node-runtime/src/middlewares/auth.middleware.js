import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  if (req?.headers?.authorization) {
    const token = req?.headers?.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(403)
          .json({ error: error, message: "Authentication failed!" });
      }
      return next();
    });
  } else {
    return res.status(403).json({ error: "No credentials sent!" });
  }
};

export { authenticateUser };
