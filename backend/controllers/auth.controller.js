import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { generateTokenAndSetCookie } from "../utils/generateJwt.js";

export const signup = catchAsync(async (req, res, next) => {
  const { fullName, username, password, passwordConfirm, gender } = req.body;

  const user = await User.findOne({ username });

  if (user) return next(new AppError("User Already Registered", 409));

  const avatar = `https://avatar.iran.liara.run/public/${
    gender === "male" ? "boy" : "girl"
  }?username=${username}`;

  const newUser = await User.create({
    fullName,
    username,
    gender,
    profilePic: avatar,
    password,
    passwordConfirm,
  });

  const token = generateTokenAndSetCookie(newUser._id, res);
  newUser.password = undefined;
  res.json({
    status: "success",
    message: "User Registerd successfully",
    token,
    data: newUser,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  const isCorrect = await user.comparePassword(password);

  if (!user || !isCorrect)
    return next(new AppError("Invalid username or password", 401));
  const token = generateTokenAndSetCookie(user._id, res);

  res.json({
    status: "success",
    message: "User logged in successfully",
    token,
    data: user,
  });
});
export const logout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({ status: "success", message: "User logged out successfully" });
};
