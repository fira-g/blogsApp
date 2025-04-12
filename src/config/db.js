import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const monDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected successfully on : ${monDb.connection.host}`);
  } catch (error) {
    console.log("Failed to connect mongoDb : ", error.message);
  }
};
