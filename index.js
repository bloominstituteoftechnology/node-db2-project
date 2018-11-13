const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.json({ api: 'tis running properly' });
});

server.get('/api/zoos', (req,res) => {
  db('zoos')
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(error => {
      res.status(500).json({err : error})
    })
})
//Currently Not working Going to figure it out later
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
    db('zoos')
      .where({id})
      .then(zoo => {
        if (!zoo.length) {
          res.status(404).json({message: `zoo with id : ${id} not found `})
        }
        res.status(200).json({zoo})
      })
    .catch(error => res.status(500).json({message: 'error getting zoo by id', error}))
})// Not working

server.post('/api/zoos', (req, res) => {
  const newZoo = req.body;
  db('zoos')
    .insert(newZoo)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting zoo ::', err });
    });
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



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
