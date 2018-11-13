const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());


// ___________ POST ZOOS_______________
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    //.returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })

    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});


// ___________ GET ZOOS_______________

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({ id:id })
  .then(zoos => res.status(200).json(zoos))
  .catch(err => res.status(500).json(err));
});
// ___________ PUT ZOOS______________

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  
  db('zoos')
    .where({ id:id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// ___________ DELETE _______________

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id:id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// ************** BBBEEEARRRSSSS ****************


// ___________ POST BEARS_______________
server.post('/api/bears', (req, res) => {
  const bear = req.body;
  db('bears')
    .insert(bear)
    //.returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })

    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

// ___________ GET BEARS_______________

server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
  .where({ id:id })
  .then(bears => res.status(200).json(bears))
  .catch(err => res.status(500).json(err));
});

// ___________ PUT BEARS______________

server.put('/api/bears/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  
  db('bears')
    .where({ id:id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// ___________ DELETE _______________

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id:id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
