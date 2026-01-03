const mongoose = require('mongoose')

const routeSchema = require("../schemas/Route");

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
