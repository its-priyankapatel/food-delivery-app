import mongoose from "mongoose";
import colors from "colors";
export const DbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected!".bgMagenta);
  } catch (error) {
    console.log("Error in Database connection");
  }
};
