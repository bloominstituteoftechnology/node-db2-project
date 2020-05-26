const express = require("express");

const db = require("../Knex/knexConfig");

const router = express.Router();

//Get Cars
router.get("/", (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to GET cars"});
    });
});

//Get Cars by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).car()
    .then(car => {
        res.json(car);
    })
    .catch(err => {
        res.status(500).json({ message: "Failed to get car by id"});
    });
});

module.exports = router;