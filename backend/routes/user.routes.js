import express from "express";
import { protect } from "../middleware/protect.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protect, getUsers);

export default router;
