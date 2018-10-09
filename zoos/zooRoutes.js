const express = require('express');

const zooModel = require('./zooModel.js');

const router = express.Router();

// get zoos
router.get('/', (req, res) => {
	zooModel
		.find()
		.then(zoos => {
			res.status(200).json(zoos);
		})
		.catch(err => res.status(500).json(err));
});

// get zoo by id
router.get('/:id', (req, res) => {
	const { id } = req.params;

	zooModel
		.findById(id)
		.then(zoo => {
			if (zoo) {
				res.status(200).json(zoo);
			} else {
				res.status(404).json({ error: 'No zoo by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// add zoo
router.post('/', (req, res) => {
	const zoo = req.body;

	zooModel
		.add(zoo)
		.then(id => {
			res.status(201).json(id);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// update zoo by id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	zooModel
		.update(id, changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No zoo by that id to update' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

// delete zoo by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	zooModel
		.remove(id)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No zoo by that id to delete' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
