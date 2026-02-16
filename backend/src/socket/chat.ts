import { Server } from "socket.io";
import { prisma } from "../config/prisma.js";

export const registerChatHandlers = (io: Server) => {
  io.on("connection", async (socket) => {
    console.log("user connected", socket.id)
    const lastMessages = await prisma.message.findMany({
        orderBy: {createdAt: "desc"},
        take: 50
    })

    socket.emit("inital messages", lastMessages.reverse())

    socket.on("send_message", async (data) => {
      try {
        console.log("sent a message", data)
        if (!data.message || data.message.length > 500) {
          return;
        }

        const savedMessage = await prisma.message.create({
          data: {
            userId: socket.user.userId,
            content: data.message,
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                level: true,
              },
            },
          },
        });
        io.emit("receive_message", savedMessage);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};
