const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    fileName: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

module.exports = fileSchema;
