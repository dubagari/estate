import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../util/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hassPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hassPassword });

  const existingUser = await User.findOne({ email });

  try {
    if (existingUser)
      return next(errorHandler(404, "Email has already been taken"));
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

export const google = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.jwt_secrete);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashpassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4),
      email: req.body.email,
      password: hashpassword,
      avater: req.body.photo,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.jwt_secrete);
    const { password: pass, ...rest } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
  try {
  } catch (error) {
    next(error);
  }
};
