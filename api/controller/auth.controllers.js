import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credential"));
    const token = jwt.sign({ id: validUser._id }, process.env.jwt_secrete);
    const { password: pass, ...ress } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(ress);
  } catch (error) {
    next(error);
  }
};
