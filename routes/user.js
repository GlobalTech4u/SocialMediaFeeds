import express from "express";

import { getAllUser, getUserById, addUser } from "../controllers/user.js";

const router = express.Router();

router.route("/").get(getAllUser).post(addUser);

router.route("/:id").get(getUserById);

export default router;
