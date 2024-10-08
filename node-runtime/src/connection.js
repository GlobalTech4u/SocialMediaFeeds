import mongoose from "mongoose";

async function connectMongoDB(url, server) {
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 70000,
  };

  return mongoose
    .connect(url, options)
    .then(() => console.log("mongodb connected"))
    .catch((error) => {
      console.log("mongodb connection failed ", error);
      server.close(() => console.log("server closed"));
    });
}

const db = mongoose.connection;

export { db };
export default connectMongoDB;
