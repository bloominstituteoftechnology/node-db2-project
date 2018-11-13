const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params;
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

server.get('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .then(zoo => {
      res.status(201).json({ zoo });
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:zooid', (req, res) => {
  const changes = req.body;
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


server.delete('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

//BEARS!!! RAWR!!!!


server.get('/api/bears', (req, res) => {
  db('bears')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get('/api/bears/:bearid', (req, res) => {
  const { bearid } = req.params;
  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

server.post('/api/bears', (req, res) => {
  const bear = req.body;

  db('bears')
    .insert(bear)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

server.get('/api/bears/:bearid', (req, res) => {
  const { bearid } = req.params;

  db('bears')
    .where({ id: bearid })
    .then(bear => {
      res.status(201).json({ bear });
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/bears/:bearid', (req, res) => {
  const changes = req.body;
  const { bearid } = req.params;

  db('bears')
    .where({ id: beari })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


server.delete('/api/bears/:bearid', (req, res) => {
  const { bearid } = req.params;

  db('bears')
    .where({ id: bearid })
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
