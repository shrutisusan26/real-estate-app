import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addPost = async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  console.log(userId);
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: userId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to create Post" });
  }
};

export const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: "Failed to get post" });
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    let userId;
    const token = req.cookies?.token;
    if (!token) userId = null;
    else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
        if (error) {
          userId = null;
        }
        userId = payload.id;
      });
    }
    const saved = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: id,
        },
      },
    });

    return res.status(200).json({ ...post, isSaved: saved ? true : false });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenId)
      return res
        .status(403)
        .json({ message: "Not Authorised to delete this Post" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Post" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenId)
      return res
        .status(403)
        .json({ message: "Not Authorised to delete this Post" });

    await prisma.post.delete({ where: { id } });
    return res.status(200).json({ message: "Deleted Post" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get Post" });
  }
};
