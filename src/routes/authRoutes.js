import express from "express"
import { login, register } from "../controllers/authController.js"

const router = express.Router()

// sign up route
router.post("/sign-up", register)

// login route
router.post("/login", login)

export default router

