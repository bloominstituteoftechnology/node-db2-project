const express = require("express");

const zoos = require("./zoosModel.js");

const router = express.Router();

//=============== ENDPOINTS =============== //

// get a list of zoos
router.get("/", (req, res) => {
  zoos
    .find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get a zoo by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const zoo = await zoos.findById(id);

    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: "Zoo not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a zoo
router.post("/", (req, res) => {
  const zoo = req.body;

  zoos
    .add(zoo)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
