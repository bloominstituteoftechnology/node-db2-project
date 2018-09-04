const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const app = express();

const db = knex(knexConfig.development);

app.use(express.json());
app.use(helmet());

// endpoints here

app.get('/api/zoos', async (req, res) => {
	try {
		const names = await db('zoos');
		res.status(200).json(names)
	} catch(err){
		res.status(500).json(err);
	}
})

app.post('/api/zoos', async (req, res) => {
	const zoo = req.body;
	try {
		const id = await db('zoos').insert(zoo)
		res.status(201).json(id);
	} catch(err){
		res.status(500).json(err);
	}
})

const port = 9000;
app.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
