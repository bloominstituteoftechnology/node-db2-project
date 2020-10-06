const express = require("express");
const db = require("../database/connection");
const router = express.Router();

function bodyCheck(req, res, next) {
  if (req.body.Make && req.body.Model) {
    next();
  } else {
    res.status(400).json({ Message: "Please add make or model" });
  }
}

function vinCheck(req, res, next) {
  if (req.body.VIN) {
    next();
  } else {
    res.status(400).json({ Message: "Please Include a VIN" });
  }
}

router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then((resp) => {
      res.status(200).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get("/:VIN", (req, res) => {
  db("cars")
    .where({ VIN: req.params.VIN })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.post("/", vinCheck, bodyCheck, (req, res) => {
  let newCar = req.body;
  db("cars")
    .insert(newCar)
    .then((resp) => {
      res.status(201).json({ message: resp });
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.put("/:VIN", vinCheck, bodyCheck, (req, res) => {
  let changes = req.body;
  db("cars")
    .where({ VIN: req.params.VIN })
    .update(changes)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.delete("/:VIN", (req, res) => {
  db("cars")
    .delete()
    .where({ VIN: req.params.VIN })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
