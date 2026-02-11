import type { Response } from "express";

export const successResponse = (res: Response, data: {} | null, msg = "Success", status = 200) => {
    return res.status(status).json({
        success: true,
        msg,
        data
    })
}

export const errorResponse = (res: Response, msg = "Error", status = 500, code = "SERVER_ERROR") => {
    return res.status(status).json({
        success: false,
        msg,
        error: {
            code
        }
    })
}