const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares/log");

const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

const MONGO_DB_URL = "mongodb://127.0.0.1:27017/SMF";
connectMongoDB(MONGO_DB_URL);

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("./log.txt"));

app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
