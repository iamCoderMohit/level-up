import express from "express"
import authRouter from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import pathRouter from "./routes/path.js"
import submitRouter from "./routes/submit.js"
import chatRouter from "./routes/chat.js"

const app = express()
app.set("trust proxy", 1);

app.use(cors({
    origin: "https://level-up-three-gamma.vercel.app",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/path", pathRouter)
app.use("/api/v1/submit", submitRouter)
app.use("/api/v1/chat", chatRouter)

export default app  