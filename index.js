const express = require('express')
const helmet = require('helmet')
const knex = require('knex')
const knexConfig = require('./knexfile')

const server = express()
const db = knex(knexConfig.development)

server.use(express.json())
server.use(helmet())

server.get('/', async (req, res) => {
  const zoos = await db.select().table('zoos')
  res.status(200).json(zoos)
})

server.get('/:id', async (req, res) => {
  const animal = await db.select().table('zoos').where('id', req.params.id)

  if (animal.length === 0) {
    res.status(500).json({ message: `id ${req.params.id} is not found in database` })  
  } else {
    res.status(200).json(animal)
  }
})

server.post('/', (req, res) => {
  db.insert(req.body)
    .into('zoos')
    .then(id => res.status(201).json(id[0]))
    .catch(error => res.status(500).json(error))
})

server.delete('/:id', (req, res) => {
  db.table('zoos')
    .where('id', req.params.id)
    .del()
    .then(id => res.status(201).json(id[0]))
    .catch(error => res.status(500).json(error))
})

server.put('/:id', (req, res) => {
  db.table('zoos')
    .where('id', req.params.id)
    .update({
      id: req.params.id,
      ...req.body
    })
    .then(id => res.status(201).json({ message: "updated successfully" }))
    .catch(error => res.status(500).json(error))
})

const port = 3300

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
});