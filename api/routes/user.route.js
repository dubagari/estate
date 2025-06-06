import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserlisting,
  getUser,
} from "../controller/user.controllers.js";
import { verifyToken } from "../util/verifyUser.js";

const route = express.Router();

route.get("/test", test);
route.post("/update/:id", verifyToken, updateUser);
route.delete("/delete/:id", verifyToken, deleteUser);
route.get("/listing/:id", verifyToken, getUserlisting);
route.get("/:id", verifyToken, getUser);

export default route;
