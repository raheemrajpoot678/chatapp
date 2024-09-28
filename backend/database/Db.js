import mongoose from "mongoose";

export const DB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Db connection established".bgGreen);
  } catch (error) {
    console.log(error);
  }
};
