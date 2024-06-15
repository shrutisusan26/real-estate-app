import prisma from "../lib/prisma.js";
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
    for( const chat of chats){
      const receiverID = chat.userIds.find((id) => id !== tokenUserId);
      const receiver = await prisma.user.findUnique({
        where :{
          id: receiverID,
        },
        select: {
          id:true, 
          username:true, 
          avatar: true,
        }
      })
      chat.receiver = receiver;
    }
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
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    await prisma.chat.update({
      where: {
        id,
      },
      data: {
        seenBy: {
          push: [tokenUserId],
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
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIds: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chats);
  } catch (e) {
    res.status(500).json({ message: "Failed to get chats" });
  }
};
