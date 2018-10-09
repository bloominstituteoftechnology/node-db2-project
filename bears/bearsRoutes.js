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

// get a bear by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const bear = await bears.findById(id);

    if (bear) {
      res.status(200).json(bear);
    } else {
      res.status(404).json({ message: "Bear not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
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

// update a bear
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  bears
    .update(id, changes)
    .then(bear => {
      if (!bear || bear < 1) {
        res.status(404).json({ message: "No bear found to update" });
      } else {
        res.status(200).json(bear);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
