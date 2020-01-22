const express = require("express");
const knex = require("knex");
const router = express.Router();

const knexConfiguration = {
    client: "sqlite3",
    connection: {
        filename: "./data/car-dealer.db3",
    },
    useNullAsDefault: true,
};


const db = knex(knexConfiguration);

router.get("/cars", (req, res) => {
    db("cars")
        .then(hubs => {
            res.json(hubs);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get data" });
        });
});


router.post("/cars", (req, res) => { 
    db("cars")
        .insert(req.body) // with SQLite, by default it returns an array with the last id
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(hubs => {
                    res.status(201).json(hubs);
                });
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Failed to store data" });
        });
});

module.exports = router;
