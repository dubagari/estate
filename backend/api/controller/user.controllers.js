import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../util/error.js";
import bcrypt from "bcryptjs";
export const test = (req, res) => {
  res.json({ message: "hello!!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "you can only update you profile"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avater: req.body.avater,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return errorHandler(401, "you can only delete your account");

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logout");
  } catch (error) {
    next(error);
  }
};

export const getUserlisting = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can only view you own listing"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const { password: paa, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
