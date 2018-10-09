const express = require('express');
const { zooDb } = require('../../data/helpers');

const router = express.Router();

// get all zoos
router.get('/', (req, res) => {
	zooDb
		.get()
		.then(zoos => res.status(200).json(zoos))
		.catch(err => res.status(500).json({ error: `Zoo information could not be retrieved: ${ err }` }));
});

// get zoo with given ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	zooDb
		.get(id)
		.then(zoo => {
			if (zoo.length) return res.status(200).json(zoo[0]);
			return res.status(404).json({ error: `Zoo with ID ${ id } does not exist` });
		})
		.catch(err => res.status(500).json({ error: `There was an error while getting the information for zoo with ID ${ id }: ${ err }` }));
});

// post new zoo and return ID of newly created zoo
router.post('/', (req, res) => {
	const name = req.body;
	zooDb
		.insert(name)
		.then(id => res.status(201).json(id.id[0]))
		.catch(err => res.status(500).json({ error: `There was an error while inserting new zoo into the database: ${ err }` }));
});

// update zoo with given ID
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const name = req.body;
	zooDb
		.update(id, name)
		.then(putBool => {
			if (putBool) return res.status(200).json(`Zoo with ID ${ id } was updated successfully`);
			return res.status(404).json(`Zoo with ID ${ id } does not exist`);
		})
		.catch(err => res.status(500).json({ error: `There was an error while updating zoo with ID ${ id }: ${ err }` }));
});

// delete zoo with given ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	zooDb
		.delete(id)
		.then(delBool => {
			if (delBool) return res.status(200).json(`Successfully deleted zoo with ID ${ id }`);
			return res.status(404).json(`Zoo with ID ${ id } does not exist`);
		})
		.catch(err => res.status(500).json({ error: `There was an error while deleting zoo with ID ${ id }: ${ err }` }));
});

module.exports = router;
