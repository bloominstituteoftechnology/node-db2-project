const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// conect to the database
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
	res.send('api working');
});

// list bears
server.get('/api/bears', (req, res) => {
	db('bears')
		.then(bears => {
			res.status(200).json(bears);
		})
		.catch(err => res.status(500).json(err));
});

// add pandas
server.post('/api/bears', (req, res) => {
	db('bears')
		.insert(req.body)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
