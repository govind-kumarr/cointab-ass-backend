import { config } from "dotenv";
import mongoose from "mongoose";

config();
export const makeConnection = async (cb) => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("Connection Established!");
    cb();
  } catch (error) {
    console.log("Error connecting to Database\n", error);
  }
};
