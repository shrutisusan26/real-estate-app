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
    return res.status(200).json({ message: "Updated user successfully" });
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
