const express = require('express');
const zooDb = require('../../data/helpers/zooDb');

const router = express.Router();

router.get('/', (req, res) => {
	zooDb
		.get()
		.then(zoos => res.status(200).json(zoos))
		.catch(err => res.status(500).json({ error: `The zoo information could not be retrieved: ${ err }` }));
});

router.post('/', (req, res) => {
	const name = req.body;
	zooDb
		.insert(name)
		.then(id => res.status(201).json(`Successfully inserted new zoo with ID ${ id.id[0] }`))
		.catch(err => res.status(500).json({ error: `There was an error while inserting the zoo into the database: ${ err }` }));
});

module.exports = router;
