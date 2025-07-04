import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

import ListingRoute from "./routes/listing.route.js";

import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("server is connected MONGODB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRoute);

app.use("/api/auth", authRoute);

app.use("/api/listing", ListingRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Enternal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
