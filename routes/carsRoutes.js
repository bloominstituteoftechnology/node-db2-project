const express = require("express");
const router = express.Router();
const Db = require("../data/dbConfig");

//  GET =======>

router.get("/", (req, res) => {
  Db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not retrieve data from database" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Db.get(id)
    .then(cars => {
      res.json(cars);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "Error retrieving account from database." });
    });
});

//  POST =======>

router.post("/", (req, res) => {
  const car = req.body;
  if (car.name && car.budget) {
    //  INSERT INTO cars (car)
    Db("cars")
      .insert(car)
      .then(car => {
        res
          .status(200)
          .json({ message: "Created new car.", response: car });
      })
      .catch(err => {
        res.status(400).json({
          message: "Error occurred when adding new car to database",
          error: err
        });
      });
  } else {
    res.status(400).json({
      message: "Unable to add new car to database due to missing data."
    });
  }
});

//  PUT =======>

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Db("cars")
    .where({ id })
    .update(req.body)
    .then(updVal => {
      res.json(updVal);
    })
    .catch(error => {
      console.log("put error");
      res.status(500).json({ message: "Update failed" });
    });
});

//  DELETE =======>

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Db("cars")
    .where({ id })
    .del()
    .then(deleted => {
      res.json(deleted);
    })
    .catch(error => {
      console.log("delete error");
      res
        .status(500)
        .json({ message: "Error removing car from database." });
    });
});

module.exports = router;
