import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./utils/connectDB";

const app = express();

app.use(express.json());

const port = process.env.PORT || 1111;

app.listen(port, async () => {
  console.log(`Server is lisining on port ${port}....`);

  await connectDB();
});
