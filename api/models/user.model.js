import mongoose from "mongoose";

const usereSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avater: {
      type: String,
      default: "https://www.pngmart.com/files/23/Profile-PNG-Photo.pngs",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usereSchema);

export default User;
