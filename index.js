const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.json({ message: 'Server running.'});
});

server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos);
  } catch(err) {
    res.status(404).json({ message: err })
  }
});

server.get('/api/zoos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const zoo = await db('zoos').where({ id: id });
    // if zoo doesn't exist, reject
    if (zoo.length === 0) {
      res.status(501).json({ message: 'A zoo with that id does not exist.'});
    } else {
      res.status(200).json(zoo);
    }
  } catch(err) {
    res.status(404).json({ message: err })
  }
});

server.post('/api/zoos', async (req, res) => {
  const newZoo = req.body;
  try {
    // if newZoo doesn't have a name, reject
    if (!newZoo.name) {
      res.status(501).json({ message: 'A unique name is required.'})
    } else {
      const idToReturn = await db('zoos').insert(newZoo);
      res.status(201).json(idToReturn);
    }
  } catch(err) {
    res.status(501).json({ message: 'The request failed.' })
  }
});

server.delete('/api/zoos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const count = await db('zoos').where({ id: id }).del();
    if (count === 0) {
      res.status(501).json({ message: "A zoo with that id does not exist."})
    } else {
      res.status(201).json({ message: `Zoo deleted.` })
    }
  } catch(err) {
    res.status(501).json({ message: error})
  }
});

server.put('/api/zoos/:id', async (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  try {
    const count = await db('zoos').where({ id: id }).update(updates);
    const updatedZoo = await db('zoos').where({ id: id });
    const zooObj = updatedZoo[0];
    res.status(201).json({zooObj});
  } catch(err) {
    res.status(501).json({ message: err });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
