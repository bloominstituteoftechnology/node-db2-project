const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

const knexConfig = require('./knexfile.js'); //import knex file as an object
const db = knex(knexConfig.development); //tells which part of knex object we want to use

server.use(express.json());
server.use(helmet());

// endpoints here
// get zoo
server.get('/api/zoo', (req, res) => {
	db('zoos').then((zoos) => res.status(200).json(zoos)).catch((err) => res.status(500).json(err));
});
// create zoo
server.post('/api/zoo', (req, res) => {
	// grab data from body
	const zoo = req.body;
	// save data to database
	db
		.insert(zoo)
		.into('zoos')
		.then((ids) => res.status(201).json(ids))
		.catch((err) => res.status(500).json({ message: 'Error inserting', err }));
	// return id of newly created record
});

// update zoo
server.put('/api/zoo/:zooid', (req, res) => {
	const changes = req.body;
	const { zooid } = req.params;

	db('zoos')
		.where({ id: zooid })
		.update(changes)
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => res.status(500).json(err));
});

// delete zoo
server.delete('/api/zoo/:zooid', (req, res) => {
	const { zooid } = req.paramas;
	db('zoos')
		.where({ id: zooid })
		.del()
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
