import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) return next(errorHandler(401, "unauthorize"));

  jwt.verify(token, process.env.jwt_secrete, (err, user) => {
    if (err) return next(errorHandler(403, "forbidden"));
    
    req.user = user;
    console.log("Decoded JWT:", user);
    console.log("req.user.id:", req.user.id);
    console.log("req.params.id:", req.params.id);
    next();
  });
};
