const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

//---------CREATE----------

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
    .then(ids => {
      res
        .status(201)
        .json(ids);
    })
    .catch(err => {
      res
        .status(500)
        .json({err: "Failed to create new Zoo"})
    })
});

//---------READ----------

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res
        .json(zoos);
    })
    .catch(err => {
      res
        .status(404)
        .json({err: "Could not find zoos"});
    })
})


server.get('/api/zoos/:id', (req, res) => {
const { id } = req.params;
db('zoos').where('id', id)
  .then(zoo => {
    res.json(zoo);
  })
  .catch(err => {
    res
      .status(404)
      .json({err: "Something went wrong"})
  })
})

//---------UPDATE----------

server.put('/api/zoos/:id', (req, res) => {
const { id } = req.params;
const zoo = req.body;
db('zoos')
  .where('id', id)
  .update(zoo)
  .then(rowCount => {
    res
      .json(rowCount);
  })
  .catch(err => {
    res
      .status(400)
      .json({err: "could not update zoo"})
  })
})

//---------DESTROY----------

server.delete('/api/zoos/:id', (req, res) => {
const { id } = req.params;
db('zoos')
  .where('id', id)
  .del()
  .then(count => {
    res.json(count)
  })
  .catch(err => {
    res
      .json({err: "Could not delete zoo"})
  })
})

const port = 5050;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
