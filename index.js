const express = require('express')
const zoosRoutes = require('./api/zoos')
const bearsRoutes = require('./api/bears')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/api/zoos', zoosRoutes)
server.use('/api/bears', bearsRoutes)

const port = 3300
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
