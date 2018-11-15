const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

router.get('/', async (req, res) => {
	try {
		let zoo = await db('zoos')
		res.status(200).json(zoo)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The posts could not be accessed from the database.' })
	}
})

router.get('/:id', async (req, res) => {
	const { id } = req.params
	try {
		let zoo = await db('zoos').where('id', id)
		zoo.length !== 0 ? res.status(200).json(zoo) : res.status(404).json({ message: 'ID not found.' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing the post from teh database.' })
	}
})

router.post('/', async (req, res) => {
	const { name } = req.body
	if (!name) {
		res.status(400).json({ errorMessage: 'A name must be provided.' })
	}

	try {
		let id = await db('zoos').insert(req.body)
		res.status(201).json(id)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The post could not be saved to the database.' })
	}
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	try {
		let count = await db('zoos').where('id', id).del()

		count > 0 ? res.status(200).json(count) : res.status(404).json({ message: 'ID not found' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The post could not be deleted.' })
	}
})

router.put('/:id', async (req, res) => {
	const changes = req.body
	const { id } = req.params

	if (!changes.name) {
		res.status(404).json({ message: 'Please provide a name.' })
	}
	try {
		let count = await db('zoos').where('id', id).update(changes)

		count > 0 ? res.status(200).json(count) : res.status(404).json({ errorMessage: 'ID not found' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The post could not be updated.' })
	}
})

module.exports = router
