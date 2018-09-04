const express = require('express');
const db = require('../data/index.js');
const router = express.Router();

router
	.route('/')
	.get(async (req, res) => {
		try {
			const names = await db('bears');
			res.status(200).json(names)
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.post(async (req, res) => {
		const bear = req.body;
		try {
			const id = await db('bears').insert(bear);
			res.status(201).json(id);
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})

router
	.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params;
		try {
			const bear = await db('bears').where({ id: id });
			bear.length > 0
			? res.status(201).json(bear)
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		try {
			const count = await db('bears').where({ id: id }).del();
			count > 0
			? res.status(201).json({ message: 'Successfully deleted.' })
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.put(async (req, res) => {
		const { id } = req.params;
		const bear = req.body;
		try {
			const count = await db('bears').where({ id: id }).update(bear);
			count > 0
			? res.status(201).json({ message: 'Successfully updated.' })
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})

module.exports = router;