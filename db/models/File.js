const mongoose = require('mongoose')

const fileSchema = require("../schemas/File");

const File = mongoose.model("File", fileSchema);

module.exports = File;
