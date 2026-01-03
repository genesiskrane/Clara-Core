const { File } = require("../db/models");

async function getGlobalFiles() {
  const files = await File.find();
  console.log("Global files fetched:", files);

  return files;
}

module.exports = { getGlobalFiles };
