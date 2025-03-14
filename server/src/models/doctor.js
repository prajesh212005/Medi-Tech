import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number },
  contactNumber: { type: String, required: true },
  availability: [
    {
      day: {
        type: String,
        enum: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ],
      },
      startTime: { type: String },
      endTime: { type: String },
      isAvailable: { type: Boolean, default: true },
    },
  ],
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
