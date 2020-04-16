const express = require("express");
const knex = require("knex");
const knexfile = require("../knexfile");

const db = knex(knexfile.development);

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send("Server Running");
});

server.get("/api/cars", (req, res) => {
	db("cars")
        .then(cars => {
            res.status(200).json(cars)
        })
		.catch(err => {
			res.status(500).json({ 
                errorMessage: err.message 
            });
		});
});

server.get("/api/cars/:id", (req, res) => {
	res.status(200).json(req.body);
});

server.post("/api/cars", (req, res) => {
	if (req.body.vin && req.body.make && req.body.model && req.body.mileage) {
		db("cars")
            .insert(req.body)
                .then(ids => {
				    db("cars").where({ id: ids[0] }).first()
                        .then(car => {
                            res.status(201).json(car)
                        });
			    })
			.catch(err => {
				res.status(500).json({ 
                    errorMessage: err.message 
                });
			});
	} else {
		res.status(400).json({ 
                errorMessage: "Car must have VIN, make, model, and mileage." 
        });
	}
});

module.exports = server;