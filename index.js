const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// ROUTES

// Add home route
server.get('/', (req, res) => {
  res.send("You are home");
});

// ==============================ZOOS ENDPOINTS=====================================

// Add GET ROUTE HANDLER to get the list of zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// Add GET ROUTE HANDLER to get a zoo by id
server.get('/api/zoos/:id', async (req, res) => {
  try{
    const { id } = req.params;

    const zoo = await db('zoos')
      .where({ id })
      .first();

    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).send({ error: "Zoo id does not exist. Please provide a valid zoo id." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add POST ROUTE HANDLER to create a zoo
server.post('/api/zoos', (req, res) => {
  if (!req.body.name){
    return res.status(400).send({ error: "Please provide a name for this zoo." });
  }
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Add DELETE ROUTE HANDLER to delete a zoo
server.delete('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where ({ id })
    .del()
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete.'});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

//Add PUT ROUTE HANDLER to update a zoo's name
server.put('/api/zoos/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('zoos')
    .where ({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update."});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

  // ============================BEARS ENDPOINTS==============================

// Add GET ROUTE HANDLER to get the list of bears
server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// Add GET ROUTE HANDLER to get a bear by id
server.get('/api/bears/:id', async (req, res) => {
  try{
    const { id } = req.params;

    const bear = await db('bears')
      .where({ id })
      .first();

    if (bear) {
      res.status(200).json(bear);
    } else {
      res.status(404).send({ error: "Bear id does not exist. Please provide a valid bear id." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add POST ROUTE HANDLER to create a bear
server.post('/api/bears', (req, res) => {
  if (!req.body.name){
    return res.status(400).send({ error: "Please provide a name for this bear." });
  }
  const bear = req.body;

  db.insert(bear)
    .into('bears')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Add DELETE ROUTE HANDLER to delete a bear
server.delete('/api/bears/:id', async (req, res) => {
  const { id } = req.params;

  db('bears')
    .where ({ id })
    .del()
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete.'});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

//Add PUT ROUTE HANDLER to update a bear's name
server.put('/api/bears/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('bears')
    .where ({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update."});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

