import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import connectMongoDB from "./connection.js";

import { logReqRes } from "./middlewares/log.js";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

dotenv.config({ path: "./environments/.env.local" });

const app = express();
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(logReqRes("./log.txt"));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const server = app.listen(PORT, () =>
  console.log(`server started at port ${PORT}`)
);
connectMongoDB(MONGO_DB_URL, server);
