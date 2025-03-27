import express from "express";
import { signup } from "../controller/auth.controllers.js";

const route = express.Router();

route.post("/signup", signup);

export default route;
