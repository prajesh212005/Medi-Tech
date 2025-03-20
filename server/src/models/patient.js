import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  dateOfBirth: {
    type: String,
    set: (val) => (val ? new Date(val).toISOString().split("T")[0] : val),
  },
  gender: { type: String, enum: ["male", "female", "other"], default: "male" },
  contactNumber: { type: String, default: "" },
  address: { type: String, default: "" },
  emergencyContact: {
    name: { type: String, default: "" },
    relationship: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
  },
  registrationDate: { type: Date, default: Date.now },
  consultationHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
