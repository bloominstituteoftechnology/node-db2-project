const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

const knexConfig = require('./knexfile.js'); //import knex file as an object
const db = knex(knexConfig.development); //tells which part of knex object we want to use

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoo', (req, res) => {
	// grab data from body
	const zoo = request.body;
	// save data to database
	db.insert(zoo).into('zoos').then((ids) => res.status(201).json(ids)).catch((err) => res.status(500).json(err));
	// return id of newly created record
});

// create zoo

// update zoo

// delete zoo

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
