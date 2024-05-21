import { addressSchema } from "../schema/users.js";
import { prismaClient } from "../index.js";

export const createAddress = async (req, res) => {
  addressSchema.safeParse(req.body);
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });
  res.status(201).json(address);
};
