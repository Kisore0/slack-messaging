import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    body("fullName").not().isEmpty().withMessage("fullName field is required"),
    body("email").not().isEmpty().withMessage("email field is required"),
    body("password").not().isEmpty().withMessage("password field is required"),
    body("displaName").optional(),
  ],
  userController.registerUser
);

authRouter.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("email field is required"),
    body("password").not().isEmpty().withMessage("password field is required"),
  ],
  userController.loginUser
);

export default authRouter;
