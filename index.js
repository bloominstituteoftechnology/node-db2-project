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
		res.status(500).json(e)
	}
})

const port = 3300
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
