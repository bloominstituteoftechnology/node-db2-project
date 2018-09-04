const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('API Running?');
});

// add a zoo
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: 'The zoo name is required, please enter the name and try again.' });
    return;
  }
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
      // .select('name')
      .then(zoos => {
          res.status(200).json(zoos);
      })
      .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  
  db('zoos')
    .where('id', '=', id)
    .then(zoo => {
        // console.log(zoo);
        if (!zoo) {
            res.status(404).json({ message: 'The zoo with the specified ID does not exist.' });
            return;
        }
        res.status(200).json(zoo);
    })
    .catch(err => {
        console.error('error', err);
        res.status(500).json({ error: 'The zoo information could not be retrieved.'})
  })
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id }) // or .where(id, '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
