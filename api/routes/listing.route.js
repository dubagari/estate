import express from "express";
import { creatingListing } from "../controller/listing.controllers.js";
import { verifyToken } from "../util/verifyUser.js";

const routes = express.Router();

routes.post("/create", verifyToken, creatingListing);

export default routes;
