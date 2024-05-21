import { prismaClient } from "../index.js";
import { productSchema } from "../schema/product.js";

export const createProduct = async (req, res) => {
  const body = productSchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ message: body.error.issues[0].message });
  }

  const { title, description, price, tag } = req.body;

  try {
    const product = await prismaClient.product.create({
      data: {
        title,
        description,
        price,
        tag,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const product = req.body;

  const { id } = req.params;

  try {
    const updateProduct = await prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: product,
    });
    return res.json(updateProduct);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.product.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "delete successfully" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const listProduct = async (req, res) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: Number(req.query.skip) || 0,
    take: 5,
  });
  res.json({
    count,
    data: products,
  });
};
