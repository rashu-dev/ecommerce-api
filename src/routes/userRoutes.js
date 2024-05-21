import express from "express"
import { createAddress } from "../controllers/userController.js"
import { authMiddleware } from "../middlewares/auth.js"

const router = express.Router()

router.post("/create-address", authMiddleware, createAddress)

export default router