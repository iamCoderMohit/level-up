import dotenv from "dotenv"
dotenv.config()
import http from "http"
import { Server } from "socket.io"

import app from "./index.js"
import { registerChatHandlers } from "./socket/chat.js"
import { wsMiddleware } from "./socket/wsMiddleware.js"
const PORT = process.env.APP_PORT || 3000

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

io.use(wsMiddleware)

registerChatHandlers(io)

server.listen(PORT, () => {
    console.log("app + socket is listening on port", PORT)
})