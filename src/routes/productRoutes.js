import express from "express"
import { createProduct, updateProduct } from "../controllers/productController.js"
import { authMiddleware } from "../middlewares/auth.js"
import { adminMiddleware } from "../middlewares/admin.js"

const router = express.Router()

// create product
router.post("/create", authMiddleware, adminMiddleware, createProduct)

// update product
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct)

export default router