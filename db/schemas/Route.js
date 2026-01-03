const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // path as unique ID
    name: { type: String, required: true }, // route name
    component: { type: String, required: true }, // component path like "pages/Home.vue"
    redirect: { type: String, default: null }, // optional redirect
    parent: { type: String, default: null }, // parent folder or null
    meta: { type: Object, default: {} }, // empty object by default
    projects: { type: [String], default: [] }, // projects using this route
  },
  { timestamps: false }
);

module.exports = routeSchema;
