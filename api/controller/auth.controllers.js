import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../util/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hassPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hassPassword });
  try {
    await newUser.save();
    res.status(201).json("user created succesefully");
  } catch (error) {
    next(error);
  }
};
