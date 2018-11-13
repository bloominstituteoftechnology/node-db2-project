const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const port = 3300;
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// find if data exists
const findById = id => {
  return db('zoos').where({ id: Number(id) });
};

// error helper
const errorHelper = (res, code, errMessage, err = 'ERROR') => {
  return res.status(code).json({ message: errMessage, err });
}

// endpoints here
// test API
server.get('/', (_, res) => {
  res.status(200).json({ api: 'running...' });
});

// POST new data
server.post('/api/zoos', (req, res) => {
  const name = req.body;

  db('zoos')
    .insert(name)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      errorHelper(res, 500, 'Error posting', err);
    });
});

// GET all data
server.get('/api/zoos', (_, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      errorHelper(res, 500, 'Error fetching', err);
    });
});

// GET data by id
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  findById(id)
    .then(zoo => {
      if (zoo.length === 0) return errorHelper(res, 404, 'Zoo Not Found');
      res.status(200).json(zoo);
    })
    .catch(err => {
      errorHelper(res, 500, 'Error fetching', err);
    });
});

// DELETE data by id
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id: id })
    .del()
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} zoo deleted` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => {
      errorHelper(res, 500, 'Error deleting', err);
    });
});

// UPDATE data by id
server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  db('zoos')
    .where({
      id: id
    })
    .update(name)
    .then(count => {
      if (count) return res.status(200).json({ message: `${count} zoo updated` });
      errorHelper(res, 404, `ID ${id} not found`);
    })
    .catch(err => {
      errorHelper(res, 500, 'Error updating', err);
    });
});

server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
