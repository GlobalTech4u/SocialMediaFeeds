const express = require("express");
const { getAllUser, getUserById, addUser } = require("../controllers/user");

const router = express.Router();

router.route("/").get(getAllUser).post(addUser);

router.route("/:id").get(getUserById);

module.exports = router;
