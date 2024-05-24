import { prismaClient } from "../index.js";
import { cartSchema, quantitySchema } from "../schema/cart.js";

export const addCart = async (req, res) => {
  const validate = cartSchema.parse(req.body);
  let product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: { id: validate.productId },
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user.id,
      productId: product.id,
      quantity: validate.quantity,
    },
  });
  res.json(cart);
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.cartItem.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "cart item delete successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const validate = quantitySchema.parse(req.body);
  const updateCart = await prismaClient.cartItem.update({
    where: { id: Number(id) },
    data: {
      quantity: validate.quantity,
    },
  });
  res.json(updateCart);
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await prismaClient.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true },
    });
    res.json(cartItems);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
