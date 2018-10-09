const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// GET //
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
////

// POST //
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
/////

// DELETE //
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
////

/////
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
