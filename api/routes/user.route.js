import express from "express";
import { test } from "../controller/user.controllers.js";

const route = express.Router();

route.get("/test", test);

export default route;
