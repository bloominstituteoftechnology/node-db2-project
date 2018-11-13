const express = require('express')
const helmet = require('helmet')
// const knex = require('knex')
// const knexConfig = require('./knexfile.js')
const zoosRouter = require('./router/zoos')
const bearsRouter = require('./router/bears')

// const db = knex(knexConfig.development)
const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/zoos', zoosRouter)
server.use('/api/bears', bearsRouter)

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
});