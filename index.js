const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const bearRouter = require('./routers/bearRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/bears', bearRouter);

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating zoo', err });
    });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ message: 'could not get zoos', err }));
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ message: 'could not get zoo', err }));
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  /* This will work as well
  const { id } = req.params;
  db('zoos')
    .where({ id })
  */
  db('zoos')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json({ message: 'could not update zoo', err }));
});

server.delete('/api/zoos/:id', (req, res) => {
  /* This will work as well
  const { id } = req.params;
  db('zoos')
    .where({ id })
  */
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json({ message: 'could not delete zoo', err }));
});

server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
