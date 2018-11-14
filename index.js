// https://github.com/LambdaSchool/db-zoos/pull/184

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development)
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (zoo.name === '') {
    res.status(400).json({ errorMessage: 'Please be sure to include all required information.' })
  } else {
    db('zoos')
      .insert(zoo)
      .then(id => {
        res.status(201).json({ message: `${id} has been added to the table.`})
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'Error communicating with data base.', err })
      })
  }
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Error communicating with data base.', err })
    })
})

server.get('/api/zoos/:zooid', async (req, res) => {
  try {
    const { zooid } = req.params
    const lookup = await db('zoos').where({ id: zooid })
    console.log(lookup)
    if (lookup.length <= 0) {
      res.status(404).json({ errorMessage: 'Bad request.' })
    } else {
      res.status(200).json(lookup)
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error communicating with data base.', err })    
  }
})

server.delete('/api/zoos/:zooid', async (req, res) => {
  const { zooid } = req.params
  try {
    const count = await db('zoos').where({ id: zooid }).del()
    if (count === 0) {
      res.status(400).json({ errorMessage: 'Unable to find that record.' })
    } else {
      res.status(200).json({ message: 'Delete Complete.' })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Error communicating with data base.', err })
  }
})

server.put('/api/zoos/:zooid', async (req, res) => {
  try {
    const { zooid } = req.params
    const changes = req.body;
    if (!changes.name) {
      res.status(400).json({ errorMessage: 'Bad request.' })
    } else {
      const updated = await db('zoos').where({ id: zooid }).update(changes)
      if (updated === 0) {
        res.status(400).json({ errorMessage: 'Unable to find that record.' })
      } else {
        res.status(200).json(`${changes.name} has been updated.`)
      }
    }
    } catch (error) {
    res.status(500).json({ errorMessage: 'Error communicating with data base.', err })
  }
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
