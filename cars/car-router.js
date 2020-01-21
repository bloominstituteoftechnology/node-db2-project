const express = require("express");
const knex = require("knex");

const knexConfiguration = {
    client: "sqlite3",
    connection: {
        filename: "./data/car-dealer.db3"
    },
    useNullAsDefault: true
};

const db = knex(knexConfiguration);

const router = express.Router();

// get all cars
router.get("/", (req, res) => {
    db("cars")
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

// get specific car by id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("cars")
    .where({ id })
    .first()
    .then(specificCar => {
        res.json(specificCar);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to retrieve specific car" });
    });
});

// add new car
router.post("/", (req, res) => {
    const carData = req.body;
    db("cars")
    .insert(carData)
    .then(ids => {
        db("cars")
        .where({ id: ids[0] })
        .then(newCarEntry => {
            res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
        console.log("POST error", err);
        res.status(500).json({ message: "Failed to store data" })
    });
});

module.exports = router;