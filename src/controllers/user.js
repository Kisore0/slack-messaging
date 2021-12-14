import { validationResult } from "express-validator";
import userFunc from "../models/user/index.js";
import { errorFormatter } from "../utils/errorFormatter.js";
import generateToken from "../utils/generateToken.js";

const userController = {};

userController.registerUser = async (req, res, next) => {
  try {
    const errorResult = validationResult(req).formatWith(errorFormatter);
    if (!errorResult.isEmpty()) {
      return res.json({ errors: errorResult.array() });
    }
    const userExists = await userFunc.findByEmail(req.body.email);
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await userFunc.createUser(req.body);
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        fullName: user.fullName,
        displayName: user.displayName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: "Bearer " + generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    next(err);
  }
};

userController.loginUser = async (req, res, next) => {
  try {
    const errorResult = validationResult(req).formatWith(errorFormatter);
    if (!errorResult.isEmpty()) {
      return res.json({ error: errorResult.array() });
    }
    const user = await userFunc.findByEmail(req.body.email);
    if (!user) {
      res.status(401);
      throw new Error("Invalid email");
    }
    if (user && (await user.matchPassword(req.body.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        displayName: user.displayName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: "Bearer " + generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid password");
    }
  } catch (err) {
    next(err);
  }
};

export default userController;
