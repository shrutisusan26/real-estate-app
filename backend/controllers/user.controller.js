import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "Failed to get user" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get user" });
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userId;
  if (id !== tokenId)
    return res.status(403).json({ message: "Not Authorised" });
  const { password, avatar, ...inputs } = req.body;
  let encryptedPassword = null;
  try {
    if (password) encryptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(encryptedPassword && { password: encryptedPassword }),
        ...(avatar && { avatar }),
        ...inputs,
      },
    });
    const { password:userPswd, ...userInfo } = updatedUser;
    return res.status(200).json(userInfo);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get user" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userId;
  if (id !== tokenId)
    return res.status(403).json({ message: "Not Authorised" });

  try {
    await prisma.user.delete({where: {id}});
    return res.status(200).json({message: "Deleted User"});

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get user" });
  }
};
export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const tokenUserId = req.userId;

  try {
    const savePost = await prisma.savedPost.findUnique({
      where:{
        userId_postId:{
          userId: tokenUserId,
          postId
        }
      }
    });
    if(savePost){
      await prisma.savedPost.delete({
        where:{
          id: savePost.id,
        }
      })
      return res.status(200).json({message: "Removed Saved Post"});

    }

    await prisma.savedPost.create({
      data:{
        userId: tokenUserId,
        postId
      }
    })
    return res.status(200).json({message: "Saved Post"});

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get user" });
  }
};

export const profilePosts = async (req, res) => {
  const id = req.params.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: id },
      
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: id },
      include:{
        post: true,
      }
      
    });

    const savedPosts = saved.map((posts) =>  posts.post);
    res.status(200).json({userPosts,savedPosts});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get profile posts" });
  }
};

export const getNotificationCount = async (req, res) => {
  const tokenUserId = req.userId
  try {
    const chats = await prisma.chat.count({
      where: { 
        userIds:{
          hasSome: [tokenUserId]
        }
       ,
       NOT: {
        seenBy :{
          hasSome: [tokenUserId]
        },
       }
      }
    });
    console.log(chats);
    res.status(200).json(chats);
    
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get chat count" });
  }
};