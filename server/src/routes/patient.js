import express from "express";
import { AuthCheck, authorizeRole } from "../middleware/AuthCheck.js";
import * as patient from "../controller/patient.js";
import * as validation from "../utils/Validator.js";
const router = express.Router();

router.get(
  "/get-profile",
  AuthCheck,
  authorizeRole("patient"),
  patient.getProfile
);

router.put(
  "/profile",
  AuthCheck,
  authorizeRole("patient"),
  validation.updatePatientProfile,
  validation.processValidationResult,
  patient.updateProfile
);

export default router;
