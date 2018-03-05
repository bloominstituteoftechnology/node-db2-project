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
  //   const { zoo } = req.body;
  //   knex.insert(zoo).into('zoos').then().catch()

  knex('zoos')
    .insert({ name })
    .then(id => {
      res.status(200).json({ id: id[0] });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error inserting zoo.', err }),
    );
});

server.get('/zoos', (req, res) => {
  knex('zoos')
    .then(zoos => {
      if (zoos.length === 0) {
        res.json({ message: 'No zoos in server.' });
        return;
      }

      res.json(zoos);
    })
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
    .where('id', id)
    .first()
    .then(zoo => {
      if (!zoo) {
        res.status(404).json({
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

server.post('/zoos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  if (!name || typeof name !== 'string') {
    res.status(422).json({
      error: 'Please provide a name for the zoo.',
      err: `${name} is not a string.`,
    });
    return;
  }

  knex('zoos')
    .where({ id: id })
    .update({ name })
    .then(updatedId => {
      if (!updatedId) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: `Query returned id ${updatedId}.`,
        });
        return;
      }

      res.json({ id: id });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error updating zoo with id ${id}`, err }),
    );
});

server.delete('/zoos/:id', (req, res) => {
  const { id } = req.params;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  knex('zoos')
    .where('id', id)
    .del()
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: `Query returned ${deleted}`,
        });
        return;
      }

      res.json({ deleted: true });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error deleting zoo.', err }),
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
    .then(bears => {
      if (bears.length === 0) {
        res.json({ message: 'No bears in server.' });
        return;
      }

      res.json(bears);
    })
    .catch(err =>
      res.status(500).json({ message: 'Error retrieving bears.', err }),
    );
});

server.post('/bears/:id', (req, res) => {
  const { id } = req.params;
  const { zooId, species, latinName } = req.body;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  if (!zooId || !species || !latinName) {
    res.status(422).json({
      error: 'Please provide zooId, species, and latinName for the bear.',
    });
    return;
  }

  knex('bears')
    .where({ id: id })
    .update({ zooId, species, latinName })
    .then(updatedId => {
      if (!updatedId) {
        res.status(404).json({
          message: `No zoo with id ${id} was found.`,
          err: `Query returned id ${updatedId}.`,
        });
        return;
      }

      res.json({ id: id });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: `Error updating zoo with id ${id}`, err }),
    );
});

server.delete('/bears/:id', (req, res) => {
  const { id } = req.params;

  if (!id || !Number.isInteger(+id)) {
    res
      .status(422)
      .json({ message: 'id must be a number.', err: `${id} is not a number.` });
    return;
  }

  knex('bears')
    .where('id', id)
    .del()
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          message: `No bear with id ${id} was found.`,
          err: `Query returned ${deleted}`,
        });
        return;
      }

      res.json({ deleted: true });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error deleting bear.', err }),
    );
});

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
