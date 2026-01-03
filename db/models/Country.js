const mongoose =  require('mongoose')

const countrySchema = require("../schemas/Country");

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
