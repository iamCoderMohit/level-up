import express from "express";
import axios from "axios";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middlewares/verifyUser.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { calculateStreak } from "../utils/calculateStreak.js";

const authRouter = express.Router();

authRouter.get("/github", (req, res) => {
  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=user:email`;

  res.redirect(githubAuthUrl);
});

authRouter.get("/callback/github", async (req, res) => {
  try {
    const code = req.query.code;

    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } },
    );

    const accessToken = tokenRes.data.access_token;

    const githubUser = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const githubId = githubUser.data.id.toString();

    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "github",
          providerAccountId: githubId,
        },
      },
      include: {
        user: true,
      },
    });

    let user;

    if (account) {
      user = account.user;
    }

    if (!account) {
      user = await prisma.user.create({
        data: {
          username: githubUser.data.login,
          avatarUrl: githubUser.data.avatar_url,
          bio: githubUser.data.bio,
          accounts: {
            create: {
              provider: "github",
              providerAccountId: githubId,
            },
          },
        },
      });
    }

    const token = jwt.sign({ userId: user!.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true, //true in prod
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/"
    });

    res.redirect(process.env.FRONTEND_URL!);
  } catch (error) {}
});

authRouter.get("/me", verifyUser, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    successResponse(res, user, "User details fetched");
  } catch (error) {
    console.error(error);
    errorResponse(res, "Can't fetch user data");
  }
});

authRouter.get("/achievements/:userId", verifyUser, async (req, res) => {
  try {
    const userId = req.params.userId as string;

    if (!userId) {
      errorResponse(res, "Provide userId");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      errorResponse(res, "Invalid userId");
    }

    const data = {
      totalXp: user?.totalXp,
      currentStreak: user?.currentStreak,
      longestStreak: user?.longestStreak,
      badge: calculateStreak(user?.currentStreak as number),
    };

    successResponse(res, data, "Achievements");
  } catch (error) {
    console.log(error);
    errorResponse(res, "Can't fetch achievements");
  }
});

authRouter.get("/currentLevel", verifyUser, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    const XP_PER_LEVEL = 500;

const totalXp = user?.totalXp ?? 0;

const currentLevel = Math.floor(totalXp / XP_PER_LEVEL);
const xpInsideLevel = totalXp % XP_PER_LEVEL;
//fix the level showing logic in the frontedn as its returning an object from here
const data = {
  currentLevel,
  xpInsideLevel,
};
successResponse(res, data)
  } catch (error) {
    console.error(error)
    errorResponse(res, "Can't fetch current level")
  }
});

export default authRouter;
