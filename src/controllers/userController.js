import { addressSchema, updateAddressSchema } from "../schema/users.js";
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

export const listAddress = async (req, res) => {
  try {
    const addresses = await prismaClient.address.findMany({
      where: { userId: req.user.id },
    });
    res.json(addresses);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateUserAddress = async (req, res) => {
  const validate = updateAddressSchema.parse(req.body);

  let shippingAddress;
  let billingAddress;

  if (validate.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: { id: validate.defaultShippingAddress },
      });
      if (shippingAddress.userId != req.user.id) {
        throw new Error("address not belong to user");
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  if (validate.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: { id: validate.defaultBillingAddress },
      });
      if (billingAddress.userId != req.user.id) {
        throw new Error("address not belong to user");
      }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
  const updatedUser = await prismaClient.user.update({
    where: { id: req.user.id },
    data: validate,
  });

  res.json(updatedUser);
};
