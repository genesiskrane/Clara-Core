const express = require("express");
const router = express.Router();

const { Country } = require("../db/models");

router.get("/:userid", (req, res) => {
  const userID = req.params.userid;

  if (userID) {
    res.json([
      { id: 1, name: "App.vue" },
      { id: 2, name: "Clara" },
    ]);
  } else {
    res.status(400).json({ error: "User ID missing" });
  }
});

router.get("/:userid/:project", (req, res) => {
  const userID = req.params.userid;
  const project = req.params.project;

  if (userID) {
    res.json([
      { id: 1, name: project },
      { id: 2, name: project },
    ]);
  } else {
    res.status(400).json({ error: "User ID missing" });
  }
});

router.post("/country", async (req, res) => {
  console.log("req.body", req.body);

  const country = new Country({
    name: req.body.name,
    code: req.body.code,
    capital: req.body.capital,
    population: req.body.population,
  });

  await country.save();
  res.send("OK");
});

module.exports = router;
