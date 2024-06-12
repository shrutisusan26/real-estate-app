import express from "express";
import { shouldBeAdmin,protectedRoute } from "../controllers/test.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();


router.get('/logged-in', verifyToken, protectedRoute )
router.get('/admin',shouldBeAdmin)
export default router;