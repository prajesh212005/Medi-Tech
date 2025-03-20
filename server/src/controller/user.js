import User from "../models/user.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { genrateToken } from "../utils/genrateToken.js";
import Patient from "../models/patient.js";
import Doctor from "../models/doctor.js";

export const register = AsyncHandler(async (req, res) => {
  const { name, role, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) throw new ErrorHandler("User already exists", 400);

  const user = await User.create({ name, role, email, password });

  if (!user) throw new ErrorHandler("User not created", 400);

  try {
    if (role === "patient") {
      const patient = await Patient.create({
        user: user._id,
        consultationHistory: [],
      });
      if (!patient) throw new Error("Patient creation failed");
      user.patient = patient._id;
      await user.save();
    } else if (role === "doctor") {
      const doctor = await Doctor.create({ user: user._id });
      if (!doctor) throw new Error("Doctor creation failed");
      user.doctor = doctor._id;
      await user.save();
    }
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw new ErrorHandler("User registration failed", 400);
  }

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

  res.status(200).json({ success: true, user, token });
});

export const getuser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) throw new ErrorHandler("user not found", 404);

  res.status(200).json({ user });
});