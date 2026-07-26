import express from "express";
import { google, signin, signup } from "../controller/auth.controllers.js";
import { signout } from "../controller/user.controllers.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/google", google);
route.get("/signout", signout);

export default route;
