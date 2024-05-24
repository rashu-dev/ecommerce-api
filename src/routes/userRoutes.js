import express from "express"
import { createAddress, deleteAddress } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/auth.js"

const router = express.Router()

// create post
router.post("/create-address", authMiddleware, createAddress)

// delete post
router.delete("/delete-address/:id", authMiddleware, deleteAddress)

export default router