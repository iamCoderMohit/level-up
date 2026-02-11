import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token

        if(!token){
            errorResponse(res, "Token not provided", 400)
        }

        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) 

        if(!decoded){
            errorResponse(res, "Invalid token")
        }

        req.user = decoded 

        next()
    } catch (error) {
        errorResponse(res, "Invalid or expired token", 401, "INVALID")
    }
}