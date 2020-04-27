const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<h1>Aaron Verdine's DB-2-Project</h1>`);
});

module.exports = router;
