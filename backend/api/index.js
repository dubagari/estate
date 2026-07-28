import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

import ListingRoute from "./routes/listing.route.js";

import cookieParser from "cookie-parser";

import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
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

const allowedOrigins = [
  "http://localhost:5173",
   "https://estate-client.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Estate API is running 🚀",
  });
});

app.use(express.json());

app.use(cookieParser());

app.use("/api/user", userRoute);

app.use("/api/auth", authRoute);

app.use("/api/listing", ListingRoute);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Enternal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});