import express from "express";
import { configDotenv } from "dotenv";
import path from "path";
import "colors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { DB } from "./database/Db.js";
import { globalErrorController } from "./controllers/globle.error.controller.js";
import { app, server } from "./socket/socket.js";

configDotenv();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

app.use(globalErrorController);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  DB();
  console.log(`Server running on port ${PORT}`.bgYellow);
});
