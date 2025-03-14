import { AsyncHandler } from "../utils/AsyncHandler.js";
import Patient from "../models/Patient.js";
export const updateProfile = AsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    contactNumber,
    address,
    emergencyContact,
  } = req.body;

  const patient = await Patient.findOneAndUpdate(
    { user: req.user._id },
    {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      contactNumber,
      address,
      emergencyContact,
    },
    { new: true }
  );

  if (!patient) {
    return res.status(404).json({
      success: false,
      message: "Patient profile not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    patient,
  });
});

export const getProfile = AsyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ user: req.user._id });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.status(200).json({ patient });
});
