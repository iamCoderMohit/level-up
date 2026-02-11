import express from "express"
import authRouter from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import pathRouter from "./routes/path.js"
import submitRouter from "./routes/submit.js"

const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/path", pathRouter)
app.use("/api/v1/submit", submitRouter)

export default app