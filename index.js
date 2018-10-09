const express = require('express')
const helmet = require('helmet')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const server = express()
const db = knex(knexConfig.development)

server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => {
  res.send("Server works!")
})

const port = 8000
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
