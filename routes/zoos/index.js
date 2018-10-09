const express = require('express');
const zooDb = require('../../data/helpers/zooDb');

const router = express.Router();

// get all zoos
router.get('/', (req, res) => {
	zooDb
		.get()
		.then(zoos => res.status(200).json(zoos))
		.catch(err => res.status(500).json({ error: `The zoo information could not be retrieved: ${ err }` }));
});

// get zoo with given ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	zooDb
		.get(id)
		.then(zoo => {
			if (zoo.length) return res.status(200).json(zoo[0]);
			return res.status(404).json({ error: `The zoo with ID ${ id } does not exist` });
		})
		.catch(err => res.status(500).json({ error: `There was an error while getting the information for zoo with ID ${ id }: ${ err }` }));
});

// post new zoo and return ID of newly created zoo
router.post('/', (req, res) => {
	const name = req.body;
	zooDb
		.insert(name)
		.then(id => res.status(201).json(`Successfully created new zoo with ID ${ id.id[0] }`))
		.catch(err => res.status(500).json({ error: `There was an error while inserting the zoo into the database: ${ err }` }));
});

module.exports = router;
