const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());


/*########################################### POST ###########################################*/

/************************ POST Zoo's ************************/
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

/*########################################### GET ###########################################*/

/************************ GET Zoo's ************************/
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

/************************ GET Zoo's By ID ************************/
server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .first()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

/*########################################### DELETE ###########################################*/

/************************ DELETE Zoo's ************************/
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
   db('zoos')
    .where({ id })
    .delete(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: `We can't find that darn ID` });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 9001;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on power (port) level ${port} ===\n`);
});
