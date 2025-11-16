import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI;

  if (isConnected) {
    console.log("=> Using existing MongoDB connection");
    return;
  }
  try {
     if (!dbURI) {
        console.log("Missing MongoDB connection URI in .dot env file");
        process.exit(1);
     }
    await mongoose.connect(dbURI);
  } catch (error) {
    console.log("Error: " + error);
  }
};
