const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    welcomeMessage: "Aaron Verdine's DB-2-Project",
  });
});

module.exports = router;
