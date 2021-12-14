import mongoose from "mongoose";
import { validationResult } from "express-validator";
import channelFunc from "../models/channel/index.js";
import { errorFormatter } from "../utils/errorFormatter.js";
const channelController = {};

channelController.createChannel = async (req, res, next) => {
  try {
    const errorResult = validationResult(req).formatWith(errorFormatter);
    if (!errorResult.isEmpty()) {
      return res.json({ errors: errorResult.array() });
    }
    const newChannel = await channelFunc.createChannel({ ...req.body, createdBy: req.user._id });
    res.status(201).json(newChannel);
  } catch (err) {
    next(err);
  }
};

channelController.getAllChannels = async (req, res, next) => {
  try {
    const channels = await channelFunc.fetchByUserId(mongoose.Types.ObjectId(req.user._id));
    res.status(200).json(channels);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default channelController;
