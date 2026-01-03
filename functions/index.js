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
      update: {
        $set: {
          name: route.name,
          component: route.component,
          redirect: route.redirect,
          parent: route.parent,
          meta: route.meta || {},
        },
        $addToSet: {
          projects: { $each: route.projects || [] }, // add new projects without duplicates
        },
      },
      upsert: true,
    },
  }));

  const result = await Route.bulkWrite(bulkOps);
  console.log("Routes saved/updated with projects:", result);
}

async function getStoreDefinitions({ actions, state }) {
  return [
    {
      type: "state",
      state: {
        user: null,
        token: null,
      },
    },
    {
      type: "action",
      body: "async login(payload) { ... }",
    },
  ];
}

module.exports = {
  getGlobalFiles,
  getProjectFiles,
  saveRoutes,
  getStoreDefinitions,
};
