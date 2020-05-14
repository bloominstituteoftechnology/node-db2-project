const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json(err.message);
    })
})

router.post("/", (req, res) => {
    db("cars")
    .insert(req.body)
    .then(id => {
        console.log(id);
        db("cars")
        .where({id: id[0]})
        .then(car => {
            res.status(201).json(car);
        })
    })
    .catch(err => {
        res.status(500).json(err.message);
    })
})




module.exports = router;
