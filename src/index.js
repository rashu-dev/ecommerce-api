import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// initialize express
const app = express()

// port
const port = process.env.PORT

// prisma client
export const prismaClient = new PrismaClient({
    log: ["query"]
})


// listening to the server
app.listen(port, () => {
    console.log(`server listening on ${port}`)
})

// middleware
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/user", userRoutes)


