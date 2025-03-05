import express from "express";
import * as user from "../controller/user.js";
import * as validation from "../utils/Validator.js";

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

export default router;
