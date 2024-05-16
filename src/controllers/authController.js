import { prismaClient } from "../index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const { hashSync, compareSync } = bcrypt;

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

    const { email, password } = req.body;
  
    let user = await prismaClient.user.findFirst({
      where: { email: email },
    });
  
    if (!user) {
      throw Error("User does not exists");
    }
  
    const isMatch = compareSync(password, user.password)

    if(!isMatch){
        return res.json({message: "Invalid credentials"})
    }

    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'})

    res.json({user, token});
  };
