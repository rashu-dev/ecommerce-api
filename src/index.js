import dotenv from "dotenv"
dotenv.config()
import express from "express"
import authRoutes from "./routes/authRoutes.js"
import { PrismaClient } from "@prisma/client"

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


