const express = require('express');
const knex = require('knex');
// const helmet = require('helmet');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

// LESS CLEAN METHOD
// const db = knex({
//     development: {
//       client: 'sqlite3',
//       connection: {
//         filename: './data/lambda.sqlite3'
//       }
//     }
// })

const server = express();

server.use(express.json());
// server.use(helmet());

// TABLE SCHEMA
// id: integer, primary key, autoincrements
// name: text, required, unique

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    // .returning('id')
    .then(ids => {
      res.status(201).json({ id: ids[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err })
    })
})

server.get('/api/zoos', (req, res) => {

  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ err }));
});

server.get('/api/zoos/:id', (req, res) => {

  db('zoos')
    .then(zoos => res.status(200).json(zoos[0]))
    .catch(err => res.status(500).json({ err }));
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where({ id: id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


// server.delete('/api/students/:studentid', (req, res) => {
//   const { studentid } = req.params;

//   db('students')
//     .where({ id: studentid })
//     .del()
//     .then(count => {
//       res.status(200).json({ count });
//     })
//     .catch(err => res.status(500).json(err));
// });

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
