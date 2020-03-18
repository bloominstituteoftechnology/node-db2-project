const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db("automobiles")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "cannot obtain list of cars at this time" });
    });
});

router.get("/:id", (req, res) => {
  db("automobiles")
    .where({ id: req.params.id })
    .first()
    .then(car => {
      car
        ? res.status(200).json(car)
        : res.status(404).json({ error: "Car not found" });
    });
});

router.post("/", (req, res) => {
  //need to validaye required information is present
  //required: VIN, make, model, mileage
  VIN = req.body.VIN;
  make = req.body.make;
  model = req.body.model;
  mileage = req.body.mileage;

  VIN && make && model && mileage
    ? db("automobiles")
        .insert(req.body, "id")
        .then(id => {
          db("automobiles")
            .where({ id })
            .first()
            .then(car => {
              res.status(200).json(car);
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Could not add car" });
        })
    : res
        .status(400)
        .json({ error: "Please provide VIN, make, model, and mileage" });
});

router.put("/:id", (req, res) => {
  db("automobiles")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      count
        ? res.status(200).json({ message: `${count} records updated` })
        : res.status(404).json({ error: "Account not found" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Cannot update record" });
    });
});

router.delete("/:id", (req, res) => {
  db("automobiles")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      count
        ? res.status(200).json({ message: `${count} records deleted` })
        : res.status(500).json({ error: "Car not found" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not remove vehicle" });
    });
});

module.exports = router;