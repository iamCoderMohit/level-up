import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { prisma } from "../config/prisma.js";

const submitRouter = express.Router();

submitRouter.post("/:taskId", verifyUser, async (req, res) => {
  try {
    const taskId = req.params.taskId as string;
    const { userId } = req.user;
    const { repoUrl } = req.body;

    if (!taskId || !userId || !repoUrl) {
      errorResponse(res, "Information missing");
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      errorResponse(res, "invalid task id");
    }

    const submission = await prisma.userTask.create({
      data: {
        userId,
        taskId,
        repoUrl,
      },
    });

    successResponse(res, submission, "Submission pending, wait for approval");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Task not submitted");
  }
});

//when approving check the xp that task contains and add that much to users total xp
submitRouter.post("/approve/:userTaskId", verifyUser, async (req, res) => {
  try {
    const userTaskId = req.params.userTaskId as string;
    const userId = req.user.userId;

    const userTask = await prisma.userTask.findFirst({
      where: {
        id: userTaskId,
        userId,
      },
      include: {
        task: true,
      },
    });

    if (!userTask) {
      errorResponse(res, "You can't perform this action");
    }

    if (userTask?.status === "APPROVED") {
      errorResponse(res, "Task already approved");
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          totalXp: {
            increment: userTask?.task.xpReward as number,
          },
        },
      }),

      prisma.userTask.update({
        where: { id: userTaskId },
        data: {
          status: "APPROVED",
        },
      }),
    ]);

    //streak logic
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    const lastActive = user?.lastActiveAt ? new Date(user.lastActiveAt) : null
    let currentStreak

    if(!lastActive){
        currentStreak = 1  
    } else {
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        lastActive.setHours(0, 0, 0, 0)

        if(lastActive.getTime() === today.getTime()){

        } else if(lastActive.getTime() === yesterday.getTime()){
            currentStreak = user?.currentStreak! + 1
        } else {
            currentStreak = 1
        }
    }

    await prisma.user.update({
        where: {
            id: userId
        },
        //@ts-ignore
        data: {
            currentStreak,
            longestStreak: Math.max(currentStreak!, user?.longestStreak!),
            lastActiveAt: new Date()
        }
    })

    successResponse(res, null, "Task approved");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Task not approved");
  }
});

export default submitRouter;
