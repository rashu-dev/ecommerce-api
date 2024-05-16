import express from "express"
import { login } from "../controllers/authController.js"

const router = express.Router()

router.get("/login", login)

export default router

