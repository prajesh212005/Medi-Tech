import express from "express";
import * as user from "../controller/user.js";
import * as validation from "../utils/Validator.js";
import { AuthCheck } from "../middleware/AuthCheck.js";

const router = express.Router();

router.post(
  "/register",
  validation.registerValidation,
  validation.processValidationResult,
  user.register
);

router.post(
  "/login",
  validation.loginValidation,
  validation.processValidationResult,
  user.login
);

router.get("/me", AuthCheck, user.getuser);

export default router;
