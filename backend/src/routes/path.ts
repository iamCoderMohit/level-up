import express from "express";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { prisma } from "../config/prisma.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const pathRouter = express.Router();


//post a path
pathRouter.post("/", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      errorResponse(res, "Title missing", 404);
    }

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    const count = await prisma.path.count();
    const order = count + 1;

    const path = await prisma.path.create({
      data: {
        title,
        description,
        slug,
        order,
      },
    });

    successResponse(res, path, "Path created");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Failed to create path");
  }
});


//get all paths without slug
pathRouter.get("/", verifyUser, async (req, res) => {
  try {
    const paths = await prisma.path.findMany();

    successResponse(res, paths, "Paths fetched successfully");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Error fetching paths");
  }
});

//get the current path of user
interface currentPath {
  pathName: string;
  pathSlug: string
}
pathRouter.get("/getCurrentPath", verifyUser, async (req, res) => {
  try {
    const userId = req.user.userId

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    let currentPath: currentPath

    if(user?.totalXp! <= 1000 && user?.totalXp! > 0) currentPath = {pathName: "Frontend Master", pathSlug: "frontend"}
    if(user?.totalXp! <= 2000 && user?.totalXp! > 1000) currentPath = {pathName: "Backend Architect", pathSlug: "backend"}
    if(user?.totalXp! <= 3000 && user?.totalXp! > 2000) currentPath = {pathName: "FullStack Slayer", pathSlug: "fullstack"}

    successResponse(res, currentPath!, "current path fetched")
  } catch (error) {
    console.error(error)
      errorResponse(res, "Can't fetch current path")
  }
})

//get a path using order and slug
pathRouter.get("/getOneLevel/:slug/:order", verifyUser, async (req, res) => {
  try {
    const {slug, order} = req.params

    if(!slug || !order){
      errorResponse(res, "Slug or order not provided")
    }

const level = await prisma.level.findFirst({
  where: {
    order: Number(order),
    path: {
      slug: String(slug),
    },
  },
  include: {
    tasks: {
      orderBy: {
        order: "asc"
      }
    },
  },
});


    successResponse(res, level, "level fetched")
  } catch (error) {
    console.error(error)
    errorResponse(res, "Can't fetch level")
  }
})

//get paths with slug
pathRouter.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      errorResponse(res, "Slug not provided");
    }

    const path = await prisma.path.findUnique({
      where: {
        slug,
      },
    });

    if (!path) {
      errorResponse(res, "Path with this slug doesn't exist");
    }

    successResponse(res, path!, "Path fetched successfully");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Error fetching path");
  }
});

// level thing
//post a level to path
pathRouter.post("/:pathId/level", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { title, description, requiredXp } = req.body;
    const pathId = req.params.pathId as string;

    if (!title) {
      errorResponse(res, "Title missing");
    }

    const count = await prisma.level.count({
      where: { pathId },
    });
    const order = count + 1;

    const level = await prisma.level.create({
      data: {
        title,
        description,
        order,
        requiredXp: requiredXp || 0,
        pathId,
      },
    });

    successResponse(res, level, "Level created");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Error creating level");
  }
});


//find all levels of a path
pathRouter.get("/:slug/level", verifyUser, async (req, res) => {
  try {
    const slug = req.params.slug as string;
    const userId = req.user.userId

    if (!slug) {
      errorResponse(res, "slug not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const path = await prisma.path.findUnique({
      where: {
        slug,
      },
      include: {
        levels: true
      }
    });

    if (!path) {
      errorResponse(res, "No levels found");
    }

    const levelWithStatus = path!.levels.map((level: any) =>({
      ...level,
      isUnlocked: user?.totalXp! >= level.requiredXp,
      parentSlug: path?.slug
    }))

    successResponse(res, {...path, levels: levelWithStatus}, "Levels fetched");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Error fetching levels");
  }
});


//post a task to a level
pathRouter.post(
  "/level/:levelId/task",
  verifyUser,
  verifyAdmin,
  async (req, res) => {
    try {
      const levelId = req.params.levelId as string;

      const { title, description, xpReward, difficulty } = req.body;

      if (!title || !xpReward || !difficulty) {
        errorResponse(res, "Provide title, xpReward and difficulty");
      }

      const level = await prisma.level.findUnique({
        where: {
          id: levelId,
        },
      });

      if (!level) {
        errorResponse(res, "Level with this id doesn't exist");
      }

      const count = await prisma.task.count({
        where: {
          levelId,
        },
      });

      const order = count + 1;

      const task = await prisma.task.create({
        data: {
          title,
          description,
          order,
          xpReward,
          difficulty,
          levelId,
        },
      });

      successResponse(res, task, "Task created");
    } catch (error) {
      console.error(error);
      errorResponse(res, "Failed to create task");
    }
  },
);


//find all tasks of a level
pathRouter.get("/level/:levelId/task", verifyUser, async (req, res) => {
  try {
    const levelId = req.params.levelId as string;

    const tasks = await prisma.task.findMany({
      where: {
        levelId,
      },
    });

    if (!tasks) {
      errorResponse(res, "No tasks found with this level id");
    }

    successResponse(res, tasks, "Tasks fetched");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Failed to fetch tasks");
  }
});





//get all info about a path
pathRouter.get("/getFullInfo/:path", verifyUser, async (req, res) => {
  try {
    const path = req.params.path as string;

    if (!path) {
      errorResponse(res, "Path slug not provided");
    }

    const info = await prisma.path.findUnique({
      where: {
        slug: path,
      },
      include: {
        levels: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!info) {
      errorResponse(res, "Invalid path name");
    }

    successResponse(res, info as {}, "Retrieved info");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Faild to get info of path");
  }
});

//get a task with task order, level order, path slug
pathRouter.get("/:pathslug/:levelorder/:taskorder", verifyUser, async (req, res) => {
  try {
    const {pathslug, levelorder, taskorder} = req.params

    if(!pathslug || !levelorder || !taskorder){
      errorResponse(res, "Information not provided")
    }

const task = await prisma.task.findFirst({
  where: {
    order: Number(taskorder),
    level: {
      order: Number(levelorder),
      path: {
        slug: String(pathslug),
      },
    },
  },
});


successResponse(res, task)
  } catch (error) {
    console.error(error)
    errorResponse(res, "Can't fetch task")
  }
})


//get a userTask with userId and taskId
pathRouter.get("/getUserTask/:taskId", verifyUser, async (req, res) => {
  try {
    const {taskId} = req.params 
    const {userId} = req.user

    if(!taskId){
      errorResponse(res, "taskId not provided")
    }

    const userTask = await prisma.userTask.findFirst({
      where : {
        userId,
        taskId: taskId as string
      }
    })

    successResponse(res, userTask, "userTask fetched successfully")
  } catch (error) {
    console.error(error)
    errorResponse(res, "can't get userTask")
  }
})
export default pathRouter;
