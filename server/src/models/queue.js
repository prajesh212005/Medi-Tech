import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  patients: [
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
      appointmentTime: { type: Date },
      arrivalTime: { type: Date },
      status: {
        type: String,
        enum: ["waiting", "in-progress", "completed", "no-show"],
        default: "waiting",
      },
      priority: { type: Number, default: 0 }, // Higher number means higher priority
      estimatedWaitTime: { type: Number }, // in minutes
    },
  ],
  isActive: { type: Boolean, default: true },
});

const Queue = mongoose.model("Queue", QueueSchema);

export default Queue;
