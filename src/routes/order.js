import express from "express";
import { authMiddleware } from "./../middlewares/auth.js";
import {
  cancelOrder,
  createOrder,
  getOrder,
  listOrders,
} from "../controllers/orderController.js";

const router = express.Router();

// create order
router.post("/create-order", authMiddleware, createOrder);

// list order
router.get("/list-orders", authMiddleware, listOrders);

// get order
router.get("/get-order/:id", authMiddleware, getOrder);

// cancel order
router.put("/cancel-order/:id", authMiddleware, cancelOrder);

export default router;
