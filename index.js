import express from "express";
import connectMongoDB from "./connection.js";

import { logReqRes } from "./middlewares/log.js";

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

const app = express();
const PORT = 3000;

const MONGO_DB_URL = "mongodb://127.0.0.1:27017/SMF";

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("./log.txt"));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const server = app.listen(PORT, () =>
  console.log(`server started at port ${PORT}`)
);
connectMongoDB(MONGO_DB_URL, server);
