const express = require('express');

const bearModel = require('./bearModel.js');

const router = express.Router();

// get bears
router.get('/', (req, res) => {
	bearModel
		.find()
		.then(bears => {
			res.status(200).json(bears);
		})
		.catch(err => res.status(500).json(err));
});

// get bear by id
router.get('/:id', (req, res) => {
	const { id } = req.params;

	bearModel
		.findById(id)
		.then(bear => {
			if (bear) {
				res.status(200).json(bear);
			} else {
				res.status(404).json({ error: 'No bear by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// add bear
router.post('/', (req, res) => {
	const bear = req.body;

	bearModel
		.add(bear)
		.then(id => {
			res.status(201).json(id);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// update bear by id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	bearModel
		.update(id, changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No bear by that id to update' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

// delete bear by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	bearModel
		.remove(id)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No bear by that id to delete' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
