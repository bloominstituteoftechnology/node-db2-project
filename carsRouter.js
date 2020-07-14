const express = require("express");

const router = express.Router();

const db = require("./dbConfig");

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.status(200).json({ cars: cars });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve user data" });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const account = await db
    .select("*")
    .from("cars")
    .where("id", id)
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ MESSAGE: "A car with that id does not exist" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const newCar = {
    vin: req.body.vin,
    make: req.body.make,
    model: req.body.model,
    milage: req.body.milage,
    transmission: req.body.transmission,
    title_status: req.body.title_status,
  };
  db("cars")
    .insert(newCar)
    .then((cars) => {
      res.status(200).json({ cars: cars });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Please enter a vin, make, model and milage" });
    });
});

module.exports = router;
