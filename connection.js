const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("=> mongodb connected"))
    .catch((error) => console.log(error));
}

module.exports = {
  connectMongoDB,
};
