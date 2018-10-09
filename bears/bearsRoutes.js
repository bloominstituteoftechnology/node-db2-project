const express = require("express");

const bears = require("./bearsModel.js");

const router = express.Router();

//=============== BEAR ENDPOINTS =============== //

// get a list of zoos
router.get("/", (req, res) => {
  bears
    .find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

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
