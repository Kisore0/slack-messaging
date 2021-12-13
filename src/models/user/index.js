import User from "./userModel.js";

const userFunc = {};

userFunc.findByEmail = (email) => User.findOne({ email });

userFunc.createUser = (newUser) => User.create(newUser);

export default userFunc;
