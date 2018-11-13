const express = require('express')
const helmet = require('helmet')
const knex = require('knex')
const knexConfig = require('./knexfile')

const db = knex(knexConfig.development)

const server = express()

server.use(express.json())
server.use(helmet())

server.get('/api/zoos', async (req, res) => {
	try {
		let zoo = await db.select('*').from('zoos')
		res.status(200).json(zoo)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The posts could not be accessed from the database.' })
	}
})

server.get('/api/zoos/:id', async (req, res) => {
	const { id } = req.params
	try {
		let zoo = await db.select('*').from('zoos').where('id', id)
		zoo.length !== 0 ? res.status(200).json(zoo) : res.status(404).json({ message: 'ID not found.' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing the post from teh database.' })
	}
})

server.post('/api/zoos', async (req, res) => {
	const { name } = req.body
	if (!name) {
		res.status(400).json({ errorMessage: 'A name must be provided.' })
	}

	try {
		let id = await db.insert(req.body).into('zoos')
		res.status(201).json(id)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The post could not be saved to the database.' })
	}
})

server.delete('/api/zoos/:id', (req, res) => {
	db('zoos')
		.where('id', req.params.id)
		.del()
		.then(count => {
			count > 0 ? res.status(200).json(count) : res.status(404).json({ message: 'ID not found' })
		})
		.catch(e => {
			console.log(e)
			res.status(500).json({ error: 'The post could not be deleted.' })
		})
})

server.put('/api/zoos/:id', (req, res) => {
	const changes = req.body
	const { id } = req.params

	if (!changes.name) {
		res.status(404).json({ message: 'Please provide a name.' })
	}

	db('zoos')
		.where('id', id)
		.update(changes)
		.then(count => {
			count > 0 ? res.status(200).json(count) : res.status(404).json({ errorMessage: 'ID not found' })
		})
		.catch(e => {
			console.log(e)
			res.status(500).json({ error: 'The post could not be updated.' })
		})
})

const port = 3300
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
