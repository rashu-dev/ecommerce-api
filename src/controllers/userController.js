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

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.address.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "address delete successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
