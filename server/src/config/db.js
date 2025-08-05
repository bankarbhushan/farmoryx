import mongoose from "mongoose";

const connectDB = async () => {
  const DB_STRING = process.env.DB_STRING;
  try {
      await mongoose.connect(DB_STRING);
    console.log(`MongoDB Connected successfully.`);
  } catch (error) {
    console.error("Db error : " + error.message);
  }
};

export default connectDB;
