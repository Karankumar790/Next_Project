// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/assessment";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };


import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return; // Connection already established
  
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
}