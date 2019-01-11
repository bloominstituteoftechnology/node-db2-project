const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)
const helmet = require('helmet')

const server = express()

server.use(express.json())

server.use(helmet())

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body
  if (zoo.name) {
    db('zoos')
      .insert(zoo)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch((err) => {
        console.log(err)
        res
          .status(500)
          .json({ err: 'Failed to insert the zoo into the database.' })
      })
  } else {
    res.status(400).json({ error: 'Please provide a name for the zoo' })
  }
})

server.get('/api/zoos', (req, res) => {

})

server.get('/api/zoos/:id', (req, res) => {})

server.delete('/api/zoos/:id', (req, res) => {})

server.put('/api/zoos/:id', (req, res) => {})

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
