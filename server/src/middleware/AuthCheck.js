import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
export const AuthCheck = AsyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new ErrorHandler("Authentication token is missing.", 403);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SCRECT_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
});
