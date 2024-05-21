import express from "express"
import { createProduct, deleteProduct, listProduct, updateProduct } from "../controllers/productController.js"
import { authMiddleware } from "../middlewares/auth.js"
import { adminMiddleware } from "../middlewares/admin.js"

const router = express.Router()

// all products
router.get("/all", listProduct)

// create product
router.post("/create", authMiddleware, adminMiddleware, createProduct)

// update product
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct)

// delete product
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct)

export default router