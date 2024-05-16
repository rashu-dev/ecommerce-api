import { prismaClient } from "../index.js";
import bcrypt from "bcryptjs";

const { hashSync } = bcrypt;

export const register = async (req, res) => {

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
};

export const login = async (req, res) => {
  return res.send("hello");
};
