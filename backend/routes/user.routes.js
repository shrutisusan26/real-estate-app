import express from "express";
import { getUser,getUsers,deleteUser, updateUser,savePost,profilePosts,getNotificationCount } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get('/', getUsers )
router.get('/search/:id',verifyToken,getUser)
router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)
router.post('/save',verifyToken,savePost)
router.get('/profilePosts',verifyToken,profilePosts)
router.get('/notification', verifyToken, getNotificationCount);


export default router;