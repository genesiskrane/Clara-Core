if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const connectDB = require("../db");

const init = async () => {
  console.info("Initializing Clara Core");
  await connectDB();
};

module.exports = { init };
