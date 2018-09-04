const express = require("express");
const helmet = require("helmet");

const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/", (req, res) => {
	res.send("API is workin' yo");
});

server.post("/api/zoos", (req, res) => {
	const zoo = req.body;
	if (!zoo.name) {
		res.status(400).json({ message: "Please provide a name" });
	}
	db.insert(zoo)
		.into("zoos")
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get("/api/zoos", (req, res) => {
	db("zoos")
		.then(zoos => {
			res.status(201).json(zoos);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get("/api/zoos/:id", (req, res) => {
	db("zoos")
		.where({ id: req.params.id })
		.then(zoo => {
			res.status(201).json(zoo);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.delete("/api/zoos/:id", (req, res) => {
	db("zoos")
		.where({ id: req.params.id })
		.del()
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.put("/api/zoos/:id", (req, res) => {
	const zoo = req.body;
	if (!zoo.name) {
		res.status(400).json({ message: "Please include name data" });
	}

	db("zoos")
		.where({ id: req.params.id })
		.update({ name: zoo.name })
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
