import prisma from "../lib/prisma.js";
export const addMessage = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: "Failed to add message" });
  }
}