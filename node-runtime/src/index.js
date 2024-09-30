import express from "express";
import cors from "cors";
// import fileUpload from "express-fileupload";
import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";

import connectMongoDB from "./connection.js";

import { logReqRes } from "./middlewares/log.js";

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config({ path: "./environments/.env.local" });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const __assets = path.join(__dirname, "../assets");

const app = express();
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());
app.use(logReqRes("./log.txt"));

// app.use("/images", express.static(__assets));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/users/:userId/posts", postRouter);

const server = app.listen(PORT, () =>
  console.log(`server started at port ${PORT}`)
);
connectMongoDB(MONGO_DB_URL, server);
