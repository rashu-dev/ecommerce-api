import dotenv from "dotenv"
dotenv.config()
import express from "express"


// initialize express
const app = express()

// port
const port = process.env.PORT


// listening to the server
app.listen(port, () => {
    console.log(`server listening on ${port}`)
})

