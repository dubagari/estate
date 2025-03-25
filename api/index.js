import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("server is connected MONGODB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("server is running at port 3000");
});
