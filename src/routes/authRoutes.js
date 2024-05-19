import express from "express"
import { currentUser, login, register } from "../controllers/authController.js"
import { authMiddleware } from "../middlewares/auth.js"

const router = express.Router()

// sign up route
router.post("/sign-up", register)

// login route
router.post("/login", login)

// current user
router.get("/current-user", authMiddleware, currentUser)

export default router

