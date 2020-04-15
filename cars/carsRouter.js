const express = require("express");
const knex = require("knex");

const knexConfiguration = {
  client: "sqlite3",
  connection: {
    filename: "./data/cars.db3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfiguration);

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve cars"
      });
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if (Number(req.params.id)) {
    db("cars")
      .where("id", "=", id)
      .first()
      .then(car => {
        res.json(car);
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to retrieve car"
        });
      });
  } else {
    next();
  }
});

router.post("/", validateCar, (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(newCar => {
      db("cars")
        .where({ id: newCar[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({
        message: "Failed to store data"
      });
    });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where("id", "=", id)
    .update(req.body)
    .then(
      res.status(204).json({
        message: "success update"
      })
    )
    .catch(err => {
      res.status(500).json({
        message: "Failed to update car"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where("id", "=", id)
    .first()
    .del()
    .then(
      res.status(204).json({
        message: "success delete"
      })
    )
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete car"
      });
    });
});

function validateCar(req, res, next) {
  if (req.body) {
    if (req.body.make && req.body.model) {
      next();
    } else if (req.body.make || req.body.model) {
      res.status(400).json({
        message: `Missing required ${req.body.make ? "model" : "make"} field`
      });
    } else {
      res.status(400).json({ message: "Missing both required fields" });
    }
  } else {
    res.status(500).json({
      message: "Problem creating Car"
    });
  }
}
// Not this advanced yet lol, thought I could try it, got it to work somehow
router.get("/:make", (req, res) => {
  console.log(req.params.make);

  db("cars")
    .select("*")
    .where("Make", req.params.make[0].toUpperCase() + req.params.make.slice(1))
    .then(cars => res.status(200).json(cars))
    .catch(err => {
      res.status(500).json({
        message: `Failed to retrieve list of ${req.params.make}`
      });
    });
});

module.exports = router;