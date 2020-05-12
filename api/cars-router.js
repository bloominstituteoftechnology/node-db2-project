const express = require("express");
const db = require('../data/dataConfig.js');

//localhost:5000/api/cars/
router.post("/", (req, res) => {
    const carData = req.body;
    db("cars")
      .insert(carData)
      .then(ids => {
        db("cars")
          .where({ id: ids[0] })
          .then(newCar => {
            res.status(201).json(newCar);
          });
      })
      .catch(err => {
        console.log("POST error", err);
        res.status(500).json({ message: "Failed to store new Car data" });
      });
  });

  //localhost:5000/api/cars/
  router.get("/", (req, res) => {
    db("cars")
      .then(carData => {
        res.json(carData);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to retrieve Car Data" });
      });
  });





module.exports = router;