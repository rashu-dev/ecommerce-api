import jwt from "jsonwebtoken";
import { prismaClient } from "./../index.js";

export const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({ message: "token not found" });
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.json("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const user = await prismaClient.user.findFirst({
      where: { id: payload.id },
    });

    if (!user) {
      return res.json("user not found");
    }
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
