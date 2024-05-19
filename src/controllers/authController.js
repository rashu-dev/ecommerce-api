import { prismaClient } from "../index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../schema/users.js";

const { hashSync, compareSync } = bcrypt;

export const register = async (req, res) => {
  try {
    const body = signupSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: body.error.issues[0].message });
    }

    const { name, email, password } = req.body;

    let user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (user) {
      throw Error("User already exists");
    }

    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
    res.json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const body = loginSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ message: body.error.issues[0].message });
    }
    
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw Error("User does not exists");
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


export const currentUser = async (req, res) => {
  return res.json(req.user)
}