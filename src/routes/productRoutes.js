import express from "express"
import { createProduct } from "../controllers/productController.js"
import { authMiddleware } from "../middlewares/auth.js"
import { adminMiddleware } from "../middlewares/admin.js"

const router = express.Router()


router.post("/create", authMiddleware, adminMiddleware, createProduct)

export default router