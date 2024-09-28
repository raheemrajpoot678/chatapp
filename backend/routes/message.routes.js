import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { protect } from "../middleware/protect.js";
const router = express.Router();

router.get("/:id", protect, getMessages);
router.post("/send/:id", protect, sendMessage);

export default router;
