const express = require('express')
const helmet = require('helmet')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const port = 8000

const server = express()
const db = knex(knexConfig.development)
server.use(helmet())
server.use(express.json())

server.route('/api/zoos')
  .get((req, res) => {
    db('zoos')
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({ error: 'Could not retrieve zoos.' }))
  })

server.route('/api/zoos')
  .post((req, res) => {
    const zoo = req.body
    db.insert(zoo)
      .into('zoos')
      .then(zoo => res.status(201).json(zoo))
      .catch(err => res.status(500).json({ error: 'The zoo could not be added.' }))
  })

server.route('/api/zoos/:id')
  .get((req, res) => {
    const { id } = req.params
    db('zoos')
      .where({ id })
      .then(zoo => {
        if (!zoo || !zoo.length) return res.status(404).json({ error: 'The specified zoo could not be found.'})
        return res.status(200).json(zoo)
      })
      .catch(err => res.status(500).json({ error: 'Could not get the specified zoo' }))
  })

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
