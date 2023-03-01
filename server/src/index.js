import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const port = process.env.PORT || 1111;

app.listen(port, async () => {
  try {
    console.log(`Server is lisining on port ${port}....`);
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected To DB");
  } catch (error) {
    console.error(error, "Failed To Start Server");
  }
});
