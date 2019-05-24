const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

server.use(express.json());
server.use(helmet());

// endpoints here
// GET /api/zoos

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(error => {
    res.status(400).json({
      message: "error retrieivng zoos"
    });
  });
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if(!req.body.name) {
    res.status(400).json({
      message: "Please provide a name for the zoo"
    })
  } else {
    db.insert(zoo)
      .into('zoos')
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(error => {
        res.status(500).json({message: "Error adding zoo"})
      })
  }
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id})
  .then(zoo => {
    if(zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({
        message: 'zoo not found'
      })
    }
  })
    .catch(error => {
      res.status(500).json(error);
    });
});
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
