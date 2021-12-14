import jwt from "jsonwebtoken";
import User from "../models/user/userModel.js";

export const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
