import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // database operations
  const { username, email, password } = req.body;

  try {
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    //create new user and save to db
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create a new user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  // check if the user exists
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Login not successful" });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Login not successful" });

    // if password is correct send cookie to user
    // res.setHeader("Set-Cookie", "test=" + "myValue");
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        // secure: true
      })
      .status(200)
      .json({ message: "Login Successful" });
    // const existingUser =
    // database operations
    // console.log("login endpoint");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login " });
  }
};

export const logout = (req, res) => {
  // database operations
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
//   console.log("logout endpoint");
};
