import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB has been connected: ${connection.host}`);
  } catch (error) {
    console.error(`Error with the connection to MongoDB\n Error:${error}`);
    process.exit(1);
  }
};
