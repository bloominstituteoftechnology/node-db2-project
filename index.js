const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const dbConfig = require('./knexfile');

const db = knex(dbConfig.development); 

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json({err:'unable to add'});
  });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(rows => res.json(rows))
  .catch(err => {res.status(500).json({message: 'cannot find animal'})})
})
server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos').where('id', id)
  .then(zoo => {res.json(zoo)})
  .catch(err => {res.status(500).json({message: 'cannot find specified animal'})})
})
server.delete('/api/zoos/:id', (req, res) => {
    const {id} = req.params;
    db('zoos').where('id', id).del()
    .then(rowsDeleted => {res.status(201).json(rowsDeleted)})
    .catch(err => {res.status(500).json({message: "cannot delete"})})
})
server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;
  db('zoos').where('id', id).update(zoo)
    .then(rowCount => {res.json(rowCount)})
    .catch(err => {res.status(500).json({message:'cannot update'})})
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
