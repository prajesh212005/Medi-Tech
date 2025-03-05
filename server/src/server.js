import express from "express";
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.js";
import { errorHandler } from "./utils/ErrorHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

//routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});

app.use(errorHandler);
