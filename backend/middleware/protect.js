import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return next(new AppError("You are not logged in", 400));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) return next(new AppError("Invalid token", 400));

  const user = await User.findById(decoded.userId);
  if (!user) return next(new AppError("User no longer exists", 400));

  req.user = user;
  next();
});
