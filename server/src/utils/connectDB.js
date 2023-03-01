import mongoose from "mongoose";

async function connectDB() {
  const dbUri = process.env.DB_URI;
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(dbUri);
    console.log;
    ("DB connected");
  } catch (error) {
    console.error("Could not connect to db");
    process.exit(1);
  }
}

export default connectDB;
