const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);
  }).catch(err => {
    res.status(500).json(err);
  })
});

server.post('/api/zoos', (req, res) => {
  if (!req.body.name) {
    res.status(422).json({ message: 'Please provide a name for the zoo'})
  }
  else {
    db.insert(req.body).into('zoos').then(ids => {
      res.status(201).json(ids)
    }).catch(err => {
      res.status(500).json({ message: 'Zoo could not be saved, please try again'})
    })
  }
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos').where('id', parseInt(req.params.id)).then(zoo => {
    if (zoo === []) {
      res.status(404).json({ message: 'A zoo with the provided id could not be found'})
    }
    else {
      res.status(200).json(zoo);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Server could not be reached, please try agian'})
  })
});

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos').where('id', parseInt(req.params.id)).del().then(id => {
    res.status(200).json(id);
  }).catch(err => {
    res.status(500).json({ message: 'The zoo could not be deleted, please try again'})
  })
});

server.put('/api/zoos/:id', (req, res) => {
  db('zoos').where('id', parseInt(req.params.id)).update(req.body).then(ids => {
    res.status(201).json({ message: 'The zoo has been successfully updated!'});
  }).catch(err => {
    res.status(500).json({ message: 'The selected zoo could not be updated, please try again'});
  })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
