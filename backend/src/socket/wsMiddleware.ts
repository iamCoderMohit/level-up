import type { Socket } from "socket.io";
import jwt from "jsonwebtoken"
import type { NextFunction } from "express";

export const wsMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
    try {
        const cookieHeader = socket.handshake.headers.cookie

        if(!cookieHeader){
            return next(new Error("No cookies found"))
        }

        const token = cookieHeader.split("; ").find(row => row.startsWith("access_token="))?.split("=")[1]

        if(!token){
            return next(new Error("No token found"))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        
        socket.user = decoded

        next()
    } catch (error) {
        next(new Error("Authentication error"))
    }
}