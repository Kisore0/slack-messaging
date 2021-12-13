import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import socketHandler from "./socket.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import { channelRouter, authRouter } from "./routes/index.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 3001;
socketHandler(io);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/channel", channelRouter);
app.use(notFound);
app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
