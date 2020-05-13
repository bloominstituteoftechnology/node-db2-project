const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
        .then(item => {
            res.status(200).json({ data: item })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("cars")
        .where({ id })
        .first()
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.post("/", (req, res) => {
    const info = req.body;
    db("cars")
        .insert(info)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(500).jason({ error: "Somethin' went wrong, bucko." })
        })
})

module.exports = router;