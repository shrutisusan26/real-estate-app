import express from "express";
import {
    getChats,
    getChat,
    postChat,
    readChat,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, postChat);
router.put("/read/:id", verifyToken, readChat);
export default router;
