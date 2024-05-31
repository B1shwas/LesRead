import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDatabase = () => {
  try {
    mongoose.connect(`${process.env.DB_URI}${DB_NAME}`).then(() => {
      console.log("Database connected!!!");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
