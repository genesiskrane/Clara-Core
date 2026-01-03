const mongoose = require("mongoose");

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_SERVER = process.env.MONGODB_SERVER;

const MONGODB_URI = () =>
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_SERVER}/main`;

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI(), {});

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
