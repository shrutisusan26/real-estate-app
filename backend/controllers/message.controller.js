import prisma from "../lib/prisma.js";
export const addMessage = async (req, res) => {
  const tokenUserID = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.chatId,
        userIds: {
          hasSome: [tokenUserID],
        },
      },
    });
    if (!chat) return res.status(404).json({ message: "Chat not fount" });
    const message = await prisma.message.create({
      data: {
        userId: tokenUserID,
        chatId: req.params.chatId,
        text: req.body.text,
      },
    });
    await prisma.chat.update({
      where: {
        id: req.params.chatId,
      },
      data: {
        seenBy: [tokenUserID],
        lastMessage: req.body.text,
      },
    });

    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Failed to add message" });
  }
};
