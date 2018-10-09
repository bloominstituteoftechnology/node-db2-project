const express = require('express')
const helmet = require('helmet')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const server = express()
const db = knex(knexConfig.development)

server.use(helmet())
server.use(express.json())

server.route('/')
  .get((req, res) => {
    db('zoos')
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json(err))
  })

server.route('/zoos')
  .post((req, res) => {
    const zoo = req.body
    db.insert(zoo)
      .into('zoos')
      .then(zoos => res.status(201).json(zoos))
      .catch(err => res.status(500).json(err))
  })

const port = 8000
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
