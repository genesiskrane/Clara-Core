const { File } = require("../db/models");

async function getGlobalFiles() {
  const files = await File.find({});
  console.log("Global files fetched:", files);

  return files;
}

async function getProjectFiles() {
  const files = await File.find({});
  console.log("Project files fetched:", files);

  return files;
}

module.exports = { getGlobalFiles, getProjectFiles };
