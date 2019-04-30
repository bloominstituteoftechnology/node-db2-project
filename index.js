const express = require('express')
const helmet = require('helmet')
const knex = require('knex')
const knexConfig = require('./knexfile')

const db = knex(knexConfig.development)
const server = express()

server.use(express.json())
server.use(helmet())

// Zoo endpoints here
server.post('/api/zoos', (req, res) => {
  const newZoo = req.body
  // console.log(newZoo)
  // return
  if (!newZoo.name || newZoo.name === '') {
    res.status(400).json({ errorMessage: 'Please provide a name to add a zoo.' })
  } else {
    db.insert(newZoo, 'id')
      .into('zoos')
      .then(id => {
        console.log(id)
        res.status(201).json(id)
      })
      .catch(e => {
        res.status(500).json({ error: 'A new Zoo could not be added.', e: e })
      })
  }
})

server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db.select('*').from('zoos')
    res.status(200).json(zoos)
  } catch (e) {
    res.status(500).json({ errorMessage: 'Could not retrieve a list of zoos' })
  }
})

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const id = req.params.id
    const zoo = await db('zoos').where({ id }).first()
    if (zoo) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({ errorMessage: `Could not retrieve a post with id: ${id}` })
    }
  } catch (e) {
    res.status(500).json({ errorMessage: `Could not retrieve a zoo with id:${id}` })
  }
})

server.delete('/api/zoos/:id', async (req, res) => {
  const id = req.params.id
  try {
    const zoo = await db('zoos').where({ id }).del()
    // res.status(200).json(zoo && !zoo.length < 1 ? zoo : 'No zoos available')
    res.status(200).json(zoo)
  } catch (e) {
    res.status(500).json({ errorMessage: `Could not delete a zoo with id:${id}` })
  }
})

server.put('/api/zoos/:id', async (req, res) => {
  const id = req.params.id
  const newZoo = req.body
  if (!newZoo.name || newZoo.name === '') {
    res.status(400).json({ errorMessage: 'Please provide a name to add a zoo.' })
  } else {
    try {
      const zoo = await db('zoos').where({ id }).update(newZoo)
      res.status(200).json(zoo)
    } catch (e) {
      res.status(500).json({ errorMessage: `Could not update the zoo with id:${id}` })
    }
  }
})

// Bears endpoints here

server.get('/api/bears', async (req, res) => {
  try {
    const bears = await db('bears')
    res.status(200).json(bears)
  } catch (e) {
    res.status(500).json({ errorMessage: 'Could not retrieve a list of bears' })
  }
})
server.get('/api/bears/:id', async (req, res) => {
  try {
    const id = req.params.id
    const bears = await db('bears').where({ id }).first()
    if (bears) {
      res.status(200).json(bears)
    } else {
      res.status(404).json({ errorMessage: 'Could not retrieve a bear with that id' })
    }
  } catch (e) {
    res.status(500).json({ errorMessage: 'Could not retrieve a bear' })
  }
})

server.post('/api/bears', async (req, res) => {
  const newBear = req.body
  if (!newBear.name || newBear.name === '') {
    res.status(400).json({ errorMessage: 'Please provide a name to add a zoo.' })
  } else {
    try {
      const bears = await db('bears').insert(newBear, 'id')
      res.status(201).json(bears)
    } catch (e) {
      res.status(500).json({ errorMessage: 'Could not a bear' })
    }
  }
})

server.put('/api/bears/:id', async (req, res) => {
  const newBear = req.body
  if (!newBear.name || newBear.name === '') {
    res.status(400).json({ errorMessage: 'Please provide a name to add a zoo.' })
  } else {
    try {
      const id = req.params.id
      const bears = await db('bears').where({ id }).update(newBear)
      res.status(200).json(bears)
    } catch (e) {
      res.status(500).json({ errorMessage: 'Could not update a list of bears' })
    }
  }
})

server.delete('/api/bears/:id', async (req, res) => {
  try {
    const id = req.params.id
    const bears = await db('bears').where({ id }).del()
    res.status(200).json(bears)
  } catch (e) {
    res.status(500).json({ errorMessage: 'Could not delete this bears' })
  }
})

const port = 3300
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
