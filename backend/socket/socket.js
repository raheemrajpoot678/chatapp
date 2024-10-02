import expess from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = expess();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let userScoketMap = {};

export const getReceiverSocketId = (id) => {
  return userScoketMap[id];
};

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) userScoketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userScoketMap));

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete userScoketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userScoketMap));
  });
});

export { app, io, server };
