import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import router from "./routers/auth.js";
import { notfound } from "./middlewares/not-found.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import { fileURLToPath } from "url";
import { createUserHandler } from "./controllers/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(notfound);
app.use(errorHandlerMiddleware);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTER */
app.post("/auth/register", upload.single("picture"), createUserHandler);
app.use(router);

const port = process.env.PORT || 1111;

app.listen(port, async () => {
  try {
    console.log(`App is running at http://localhost:${port}`);
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected To DB");
  } catch (error) {
    console.error(error, "Failed To Start Server");
  }
});
