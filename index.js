const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
// telling it to configure an object, which is our database
const db = knex(knexConfig.development)


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// testing server
server.get('/', (req, res) => {
  res.json("Yahoo was good for Japanese Market place")
});

// get
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// get by id 
server.get('/api/zoos/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const zoo = await db('zoos')
        // when using where, the api returns a collection
        // meaning an array with nested object returns
        .where({ id })
        .first() // or { id[0] }
        if(zoo) {
          res.status(200).json(zoo);
        } else {
          res.status(404).json({ message: `Zoo ID ${id} does not exhist`})
        }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create 
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo).into('zoos')
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json(err);
    })
});
// update
server.put('/api/zoos/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const changes = req.body;

      const updatedZoo = await db('zoos')
        .where({ id })
        .update(changes)
        if(!updatedZoo || updatedZoo < 1) {
          res.status(404).json({ message: `Record with ID ${id} does not exhist`})
        } else {
          res.status(200).json({ message: `${updatedZoo} Zoo was modified`});
        }
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete
server.delete('/api/zoos/:id', async (req, res) => {
  try {
      const { id } = req.params;

      const zoo = await db('zoos')
        // when using where, the api returns a collection
        // meaning an array with nested object returns
        .where({ id })
        .delete()
        if(zoo) {
          res.status(200).json(zoo);
        } else {
          res.status(404).json({ message: `Zoo ID ${id} does not exhist`})
        }
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on PORT ${port} ===\n`);
});
