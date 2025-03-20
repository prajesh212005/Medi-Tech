import express from "express";
import { AuthCheck, authorizeRole } from "../middleware/AuthCheck.js";
import * as appoinmentController from "../controller/Appoinment.js";
import {
  createApponiment,
  processValidationResult,
} from "../utils/Validator.js";

const router = express.Router();

router.post(
  "/create",
  AuthCheck,
  authorizeRole("patient"),
  createApponiment,
  processValidationResult,
  appoinmentController.createAppoinment
);

router.put(
  "/start/:appointmentId",
  AuthCheck,
  authorizeRole("doctor"),
  appoinmentController.startConsultation
);

router.put(
  "/complete/:appointmentId",
  AuthCheck,
  authorizeRole("doctor"),
  appoinmentController.completeConsultation
);

router.get(
  "/get-all-appoinement-patient",
  AuthCheck,
  appoinmentController.getPatientAppointments
);

router.get(
  "/get-appoinement-detail-patient/:appointmentId",
  AuthCheck,
  appoinmentController.getAppoinemtDataForPatient
);

router.get(
  "/medical-history",
  AuthCheck,
  appoinmentController.getMedicalHistory
);

router.get(
  "/get-all-appoinment-doctor/:doctorId",
  AuthCheck,
  appoinmentController.getAllAppoinmentsDoctor
);
// router.put(
//   "/:appointmentId",
//   AuthCheck,
//   appoinmentController.updateAppointmentStatus
// );

// router.get(
//   "/pending/:doctorId",
//   AuthCheck,
//   appoinmentController.getPendingAppointments
// );

// router.get(
//   "/available-time/:doctorId/:date",
//   AuthCheck,
//   appoinmentController.getAllAvaiableTime
// );

export default router;
