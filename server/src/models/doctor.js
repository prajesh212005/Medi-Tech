import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  specialization: { type: String, default: "" },
  qualification: { type: String, default: "" },
  experience: { type: Number, default: 0 },
  contactNumber: { type: String, default: "" },
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
      startTime: { type: String, default: Date.now },
      endTime: { type: String, default: Date.now },
      isAvailable: { type: Boolean, default: true },
    },
  ],
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
