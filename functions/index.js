const fs = require("fs");
const path = require("path");

const { File, Route } = require("../db/models");

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

async function saveRoutes({ routes }) {
  if (!routes || !Array.isArray(routes) || !routes.length) return;

  const bulkOps = routes.map((route) => ({
    updateOne: {
      filter: { _id: route._id },
      update: { $set: route },
      upsert: true, // insert if not exists
    },
  }));

  const result = await Route.bulkWrite(bulkOps);
  console.log("Routes saved:", result);
}

module.exports = { getGlobalFiles, getProjectFiles, saveRoutes };
