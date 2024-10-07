import express from "express";
import cors from "cors";
// import fileUpload from "express-fileupload";
import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";
import { Server } from "socket.io";

import connectMongoDB from "./connection.js";

import { logReqRes } from "./middlewares/log.middleware.js";
import { authenticateUser } from "./middlewares/auth.middleware.js";

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
const CLIENT_APP_URL = process.env.CLIENT_APP_URL;
// const SOCKET_IO_CLIENT_URL = process.env.SOCKET_IO_CLIENT_URL;

app.use(cors({ origin: "*" }));
// app.use(
//   cors({
//     origin: CLIENT_APP_URL,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,PATCH,DELETE,POST,PUT");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );

//   next();
// });
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());
app.use(logReqRes("./log.txt"));
app.use("/api/users/*", authenticateUser);
// app.use("/images", express.static(__assets));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/users/:userId/posts", postRouter);

const server = app.listen(PORT, () =>
  console.log(`server started at port ${PORT}`)
);
connectMongoDB(MONGO_DB_URL, server);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`a user connected `, socket?.handshake?.query?.userId);

  if (
    socket?.handshake?.query?.userId &&
    socket?.handshake?.query?.userId !== "undefined"
  ) {
    console.log("=> user joining ", socket?.handshake?.query?.userId);
    socket.join(socket?.handshake?.query?.userId);

    socket.on("add_post", ({ userId, followers }) => {
      socket.to(followers).emit("post_added", { userId: userId });
    });
  }
});
