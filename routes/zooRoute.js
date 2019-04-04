const router = require('express').Router();

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.post('/', async (req, res) => {
	try {
		const { id } = await db('zoos').insert(req.body);
		const zoo = await db('zoos').where({ id }).first();
		res.status(201).json(zoo);
	} catch (error) {
		res.status(500).json({ error: 'post error' });
	}
});
router.get('/', async (req, res) => {
	try {
		const zoo = await db('zoos');
		res.status(200).json(zoo);
	} catch (error) {
		res.status(500).json({ error: 'error with get request' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		db('zoos').where({ id }).then((zoo) => {
			res.status(200).json(zoo);
		});
	} catch (error) {
		res.status(500).json({ error: 'error with get request' });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const edit = await db('zoos').where({ id }).update(req.body);

		if (edit > 0) {
			const zoo = await db('zoos').where({ id }).first();
			res.status(200).json(edit);
		} else {
			res.status(404).json({ message: 'This animal does not exist!' });
		}
	} catch (error) {
		res.status(500).json({ message: 'error with changing the animal' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const removed = await db('zoos').where({ id }).delete();
		res.status(404).json({ message: 'Animal removed from this zoo ' });
	} catch (error) {
		res.status(500).json({ error: 'The animal was not deleted' });
	}
});

module.exports = router;
