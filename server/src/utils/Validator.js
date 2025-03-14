import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["patient", "doctor", "receptionist", "admin"])
    .withMessage("Role must be either 'patient', 'doctor', or 'admin'"),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export const updatePatientProfile = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("phoneNumber")
    .optional()
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),

  body("dateOfBirth")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("Please enter a valid date in YYYY-MM-DD format")
    .isBefore(new Date().toISOString())
    .withMessage("Date of birth must be a past date"),

  body("gender")
    .optional()
    .trim()
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender selection"),

  body("address")
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Address must be between 5 and 100 characters"),

  body("emergencyContact.name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Emergency contact name must be between 2 and 50 characters"),

  body("emergencyContact.relationship")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Emergency contact relationship is required"),

  body("emergencyContact.contactNumber")
    .optional()
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Emergency contact number must be exactly 10 digits"),
];

export const processValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    return next(error);
  }
  next();
};
