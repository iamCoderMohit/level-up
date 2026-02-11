import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { errorResponse } from "../utils/apiResponse.js";

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId} = req.user

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            errorResponse(res, "This user doesnt exist")
        }

        if(user?.role !== "ADMIN"){
            errorResponse(res, "Normal users are not allowed to perform this action")
        }

        next()
    } catch (error) {
        console.error(error)
        errorResponse(res, "Error verifying admin")
    }
}