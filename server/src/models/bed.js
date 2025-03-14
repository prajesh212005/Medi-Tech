import mongoose from "mongoose";

const BedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true, unique: true },
  wardType: {
    type: String,
    enum: ["general", "private", "semi-private", "icu", "emergency"],
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance"],
    default: "available",
  },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  admissionDate: { type: Date },
  expectedDischargeDate: { type: Date },
  notes: { type: String },
});

const Bed = mongoose.model("Bed", BedSchema);

export default Bed;
    