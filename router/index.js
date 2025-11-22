const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Clara API");
});

module.exports = router;
