import express from "express";
import {
  creatingListing,
  deleteListing,
} from "../controller/listing.controllers.js";
import { verifyToken } from "../util/verifyUser.js";

const routes = express.Router();

routes.post("/create", verifyToken, creatingListing);
routes.delete("/delete/:id", verifyToken, deleteListing);

export default routes;
