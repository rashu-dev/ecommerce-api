import express from "express"
import { createAddress, deleteAddress, listAddress, updateUserAddress } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/auth.js"

const router = express.Router()


// create post
router.post("/create-address", authMiddleware, createAddress)

// get addresses
router.get("/all-addresses", authMiddleware, listAddress)

// delete post
router.delete("/delete-address/:id", authMiddleware, deleteAddress)

// delete post
router.put("/update-user-address", authMiddleware, updateUserAddress)

export default router