const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here for zoo's
server.get("/api/zoos", (req, res) => {
	db("zoos")
		.then(zoos => {
			res.status(200).json(zoos);
		})
		.catch(err => res.status(500).json(err));
});

server.get("/api/zoos/:id", (req, res) => {
	const { id } = req.params;
	db("zoos")
		.where({ id })
		.then(zoos => {
			res.status(200).json(zoos);
		})
		.catch(err => res.status(500).json(err));
});

// create courses
server.post("/api/zoos", (req, res) => {
	const zoo = req.body;
	if (!zoo) {
		res.status(500).json({ error: "You need to include a body." });
	} else {
		db.insert(zoo)
			.into("zoos")
			.then(ids => {
				res.status(201).json(ids[0]);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

server.put("/api/zoos/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db("zoos")
		.where({ id })
		.update(changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(401).json({ message: "no zoo records found to update" });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

server.delete("/api/zoos/:id", (req, res) => {
	const { id } = req.params;
	db("zoos")
		.where({ id })
		.del()
		.then(count => {
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json({ error: "There is no record to delete." });
		});
});

//API Endpoints for Bears
server.get("/api/bears", (req, res) => {
	db("bears")
		.then(bears => {
			res.status(200).json(bears);
		})
		.catch(err => res.status(500).json(err));
});

server.get("/api/bears/:id", (req, res) => {
	const { id } = req.params;
	db("bears")
		.where({ id })
		.then(bears => {
			res.status(200).json(bears);
		})
		.catch(err => res.status(500).json(err));
});

server.post("/api/bears", (req, res) => {
	const bear = req.body;
	if (!bear) {
		res.status(500).json({ error: "You need to include a body." });
	} else {
		db.insert(bear)
			.into("bears")
			.then(ids => {
				res.status(201).json(ids[0]);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

server.put("/api/bears/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db("bears")
		.where({ id })
		.update(changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(401).json({ message: "no zoo records found to update" });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

server.delete("/api/bears/:id", (req, res) => {
	const { id } = req.params;
	db("bears")
		.where({ id })
		.del()
		.then(count => {
			res.status(200).json(count);
		})
		.catch(err => {
			res.status(500).json({ error: "There is no record to delete." });
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
