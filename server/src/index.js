import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { createUserHandler } from "./controllers/auth.js";
import authRoutes from "./routers/auth.js";
import postRoute from "./routers/post.js";
import userRoute from "./routers/user.js";
import deserializeUser from "./middlewares/deserializeUser.js";
import { requireUser } from "./middlewares/requireUser.js";
import { createPostHandler } from "./controllers/post.js";
// import UserModel from "./models/auth/register.js";
// import PostModel from "./models/post.js";
// import { posts, users } from "./data/index.js";
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

/* MIDDLEWARE */
app.use(deserializeUser);

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), createUserHandler);
app.post("/posts", requireUser, upload.single("picture"), createPostHandler);
app.use("/auth", authRoutes);
app.use("/posts", postRoute);
app.use("/users", userRoute);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 1111;
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );

    /* DUMMY DATA 
    UserModel.insertMany(users);
    PostModel.insertMany(posts);
    */
  })
  .catch((error) => console.log(`${error} did not connect`));
