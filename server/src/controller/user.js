import User from "../models/user.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { genrateToken } from "../utils/genrateToken.js";

export const register = AsyncHandler(async (req, res) => {
  const { name, role, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) throw new ErrorHandler("User already exists", 400);

  const user = await User.create({ name, role, email, password });

  if (!user) throw new ErrorHandler("User not created", 400);

  const newuser = await User.findById(user._id).select("-password");

  res.status(201).json({
    success: true,
    user: newuser,
  });
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new ErrorHandler("Invalid email or password", 401);

  const match = await user.comparePassword(password);

  if (!match) throw new ErrorHandler("Invalid email or password", 401);

  const token = genrateToken(user);

  const tokenOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    maxAge: 1 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  res.cookie("token", token, tokenOptions);

  res.status(200).json({ success: true, user });
});
