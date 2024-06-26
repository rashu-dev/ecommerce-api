import express from "express";
import { authMiddleware } from "./../middlewares/auth.js";
import {
  addCart,
  deleteCart,
  getCart,
  updateCart
} from "../controllers/cartItemController.js";

const router = express.Router();

// add cart
router.post("/add-cart", authMiddleware, addCart);

// delete cart
router.delete("/delete-cart/:id", authMiddleware, deleteCart)

// delete cart
router.put("/update-cart/:id", authMiddleware, updateCart)

// all cart items
router.get("/all-cart-items", authMiddleware, getCart)

export default router;
