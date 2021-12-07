import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import socketHandler from "./socket.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const PORT = process.env.PORT || 3001;
socketHandler(io);

app.use(express.json());
app.use(cors());

httpServer.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
