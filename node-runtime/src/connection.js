import mongoose from "mongoose";

async function connectMongoDB(url, server) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch((error) => {
      console.log("mongodb connection failed ", error);
      server.close(() => console.log("server closed"));
    });
}

const db = mongoose.connection;

export { db };
export default connectMongoDB;
