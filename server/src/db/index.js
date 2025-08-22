import mongoose from "mongoose";

const connectDB = async () => {
  const DB_STRING = process.env.DB_STRING;
  try {
   const connectionInstance=  await mongoose.connect(DB_STRING);
    console.log(`MongoDB Connected successfully. host => ${connectionInstance.host}`);
  } catch (error) {
    console.error("MONGODB CONNECTION FAILED : " + error.message);
    process.exit(1);
    // this will direct exist and no ferther code will run.
  }
};

export default connectDB;
