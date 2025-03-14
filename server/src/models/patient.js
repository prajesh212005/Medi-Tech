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
  medicalHistory: [
    {
      condition: { type: String },
      diagnosis: { type: String },
      treatment: { type: String },
      diagnosedDate: { type: Date },
      notes: { type: String },
    },
  ],
  emergencyContact: {
    name: { type: String, default: "" },
    relationship: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
  },
  registrationDate: { type: Date, default: Date.now },
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
