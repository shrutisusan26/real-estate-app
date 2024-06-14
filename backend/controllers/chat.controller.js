import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [tokenUserId],
        },
      },
    });
    return res.status(200).json(chats);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get chats" });
  }
};
export const getChat = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id,
        userIds: {
          hasSome: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to get chat" });
  }
};
export const postChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIds: [tokenUserId, req.body.receiverID],
      },
    });
    return res.status(200).json(newChat);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to create chat" });
  }
};
export const readChat = async (req, res) => {
  // try {
  //   const chats = await prisma.chat.findMany();
  //   res.status(200).json(chats);
  // } catch (e) {
  //   res.status(500).json({ message: "Failed to get chats" });
  // }
};
