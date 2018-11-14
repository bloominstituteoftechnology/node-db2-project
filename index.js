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
  res.json({ api: 'up' });
});


//====POST====
server.post('/api/zoos', (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: 'The request is missing required information: name of zoo' })
  } else {
      db('zoos')
      .insert(req.body)
      .into('zoos')
      .then(id => {
        res.status(201).json(id)
    })
    .catch(err => res.status(500).json({ message: 'The zoo record could not be created.'}))
  }

})
//====GET ALL ZOOS====
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => res.status(200).json(zoos))
  .catch(err => res.status(500).json({message: 'There was an error retrieving the Zoos information'}))
})


//====GET ZOO BY ID====
server.get('/api/zoos/:id', (req, res) => {
  let { id } = req.params;
  // id = id - 1;
  db('zoos').where({id}).then(zoo => {
    if (zoo.id !== 0) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({ message: "The zoo with the specified id does not exist." });
    }
  }).catch(error => {
    res.status(500).json({ error: "Cant get zoo data." });
  });
});

//====REMOVE BY ID====
server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} records deleted` })
      } else {
        res.status(404).json({ message: 'A zoo with that ID could not be found' })
      }
    })
    .catch(err => res.status(500).json({ message: 'There was an error accessing the server' }))
})

//====UPDATE====
server.put('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if (count) {
      res.status(200).json({ message: 'The zoo information has been updated' })
    } else {
      res.status(404).json({ message: 'A zoo with that ID could not be found' })
    }
  })
  .catch(err => res.status(500).json({ message: 'There was an error accessing the record' }))
})
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
