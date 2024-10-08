import mongoose from "mongoose";

async function connectMongoDB(url, server) {
  const options = {
    serverSelectionTimeoutMS: 6000,
    socketTimeoutMS: 55000,
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
