const express = require('express');
const { bearDb } = require('../../data/helpers');

const router = express.Router();

// get all bears
router.get('/', (req, res) => {
	bearDb
		.get()
		.then(bears => res.status(200).json(bears))
		.catch(err => res.status(500).json({ error: `Bear information could not be retrieved: ${ err }` }));
});

// get bears with given ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	bearDb
		.get(id)
		.then(bear => {
			if (bear.length) return res.status(200).json(bear[0]);
			return res.status(404).json({ error: `Bear with ID ${ id } does not exist` });
		})
		.catch(err => res.status(500).json({ error: `There was an error while getting the information for bear with ID ${ id }: ${ err }` }));
});

// post new bear and return ID of newly created bear
router.post('/', (req, res) => {
	const name = req.body;
	bearDb
		.insert(name)
		.then(id => res.status(201).json(id.id[0]))
		.catch(err => res.status(500).json({ error: `There was an error while inserting new bear into the database: ${ err }` }));
});

// update bear with given ID
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const name = req.body;
	bearDb
		.update(id, name)
		.then(putBool => {
			if (putBool) return res.status(200).json(`Bear with ID ${ id } was updated successfully`);
			return res.status(404).json(`Bear with ID ${ id } does not exist`);
		})
		.catch(err => res.status(500).json({ error: `There was an error while updating bear with ID ${ id }: ${ err }` }));
});

// delete bear with given ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	bearDb
		.delete(id)
		.then(delBool => {
			if (delBool) return res.status(200).json(`Successfully deleted bear with ID ${ id }`);
			return res.status(404).json(`Bear with ID ${ id } does not exist`);
		})
		.catch(err => res.status(500).json({ error: `There was an error while deleting bear with ID ${ id }: ${ err }` }));
});

module.exports = router;
