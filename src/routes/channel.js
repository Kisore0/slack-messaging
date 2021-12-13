import express from "express";
import { body } from "express-validator";
import channelController from "../controllers/channel.js";

const channelRouter = express.Router();

channelRouter.post(
  "/create",
  [
    body("title").not().isEmpty().withMessage("title field is required"),
    body("description").not().isEmpty().withMessage("description field is required"),
  ],
  channelController.createChannel
);

channelRouter.get("/get", channelController.getAllChannels);

export default channelRouter;
