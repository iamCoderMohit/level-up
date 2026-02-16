import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { prisma } from "../config/prisma.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const chatRouter = express.Router();

chatRouter.get("/", verifyUser, async (req, res) => {
  try {
    const msg = await prisma.message.findMany({
      take: 10,
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: {
            select: {
                username: true
            }
        }
      }
    });

    successResponse(res, msg);
  } catch (error) {
    console.error(error);
    errorResponse(res, "Can't get messages");
  }
});

export default chatRouter;
