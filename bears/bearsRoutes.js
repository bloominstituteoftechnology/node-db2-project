const express = require("express");

const bears = require("./bearsModel.js");

const router = express.Router();

//=============== BEAR ENDPOINTS =============== //

// Add a bear
router.post("/", (req, res) => {
  const { name } = req.body;
  const bear = { name };

  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name for your bear." });
  }
  bears
    .add(bear)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
