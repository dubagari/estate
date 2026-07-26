import express from "express";
import {
  creatingListing,
  deleteListing,
  updatedListing,
  getListing,
  getListings,
} from "../controller/listing.controllers.js";
import { verifyToken } from "../util/verifyUser.js";

const routes = express.Router();

routes.post("/create", verifyToken, creatingListing);
routes.delete("/delete/:id", verifyToken, deleteListing);
routes.post("/updated/:id", verifyToken, updatedListing);
routes.get("/get/:id", getListing);
routes.get("/get", getListings);

export default routes;
