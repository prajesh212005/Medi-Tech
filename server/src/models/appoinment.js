import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "no-show"],
      default: "scheduled",
    },
    reason: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
