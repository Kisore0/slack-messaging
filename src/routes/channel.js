import express from "express";
import { body } from "express-validator";
import channelController from "../controllers/channel.js";
import { protect } from "../middlewares/authMiddleware.js";

const channelRouter = express.Router();

channelRouter.post(
  "/create",
  protect,
  [
    body("title").not().isEmpty().withMessage("title field is required"),
    body("description").not().isEmpty().withMessage("description field is required"),
  ],
  channelController.createChannel
);

channelRouter.get("/get", protect, channelController.getAllChannels);

export default channelRouter;
