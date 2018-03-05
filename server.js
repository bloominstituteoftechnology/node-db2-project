const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running...' });
});

server.post('/zoos', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(422).json({
      error: 'Please provide a name for the zoo.',
      err: `${name} is not a string.`,
    });
    return;
  }

  knex('zoos')
    .insert({ name })
    .then(id => {
      res.status(200).json({ id: id[0] });
    })
    .catch(err => res.status(500).json(err));
});

server.get('/zoos', (req, res) => {
  knex('zoos')
    .select('*')
    .then(zoos => res.json(zoos))
    .catch(err =>
      res.status(500).json({ message: 'Error retrieving zoos.', err }),
    );
});

server.get('/zoos/:id', (req, res) => {
  const { id } = req.params;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  knex('zoos')
    .where('id', +id)
    .select('*')
    .first()
    .then(zoo => {
      if (!zoo) {
        res.status(500).json({
          message: `No zoo with id ${id} was found.`,
          err: 'Query returned undefined.',
        });
        return;
      }

      res.json(zoo);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error retrieving zoo with id ${id}`, err }),
    );
});

server.post('/bears', (req, res) => {
  const { zooId, species, latinName } = req.body;

  knex('bears')
    .insert({
      zooId,
      species,
      latinName,
    })
    .then(id => res.json({ id: id[0] }))
    .catch(err => res.status(500).json({ message: 'Error saving bear.', err }));
});

server.get('/bears', (req, res) => {
  knex('bears')
    .select('*')
    .then(bears => res.json(bears))
    .catch(err =>
      res.status(500).json({ message: 'Error retrieving bears.', err }),
    );
});

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
