import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
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
  date: { type: Date, required: true, default: Date.now },
  symptoms: [{ type: String }],
  diagnosis: [{ type: String }],
  prescriptions: [
    {
      medication: { type: String },
      dosage: { type: String },
      frequency: { type: String },
      duration: { type: String },
      notes: { type: String },
    },
  ],
  labTests: [
    {
      test: { type: String },
      result: { type: String },
      resultDate: { type: Date },
      notes: { type: String },
    },
  ],
  followUpDate: { type: Date },
  notes: { type: String },
  consultationFee: { type: Number },
});

const Consultation = mongoose.model("Consultation", ConsultationSchema);

export default Consultation;
