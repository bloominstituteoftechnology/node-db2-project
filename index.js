const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

/*
  - GET /api/zoos/:id --> ##
  - GET /api/zoos --> ##

  - POST /api/zoos

  - DELETE /api/zoos/:id

  - PUT /api/zoos/:id
*/

server.get('/', (req, res) => {
  res.send("Welcome to the DB Zoo, Where all the animals come to stay!");
});



server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoo => {
      
      if (!zoo || zoo.length < 1) {
        res.status(404).json({ missingError: 'Hmm... It Seems All the Zoos are on Vacation! Come back soon or try again!' });
      } else {
        res.status(200).json(zoo);
      }

    })
    .catch(err => res.status(500).json(err));
});



server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos').where({ id }).first()
    .then(zoo => {

      if (zoo) {
        res.status(200).json(zoo);
      } else if (!zoo || zoo.length < 1) {
        res.status(404).json({ missingError: 'Invalid ID, or the specified zoo no longer exists ;-;' });
      };

    })
    .catch(err => res.status(500).json(err));
});



const port = 4401;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
