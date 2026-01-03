const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  capital: { type: String, required: true },
  population: { type: Buffer, required: true },
});

module.exports = countrySchema;
