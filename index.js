const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const port = 3300;

server.post('/api/zoos', (req, res) => {
  const { name } = req.body;
  !name
    ? res.status(400).json({ error: 'Property "name" is required!' })
    : db('zoos')
        .insert({ name })
        .then(ids => res.status(201).json(ids[0]))
        .catch(err => {
          res
            .status(500)
            .json({ error: 'Something went wrong adding your new zoo!' });
          console.error(err);
        });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(results =>
      !results.length
        ? res.json({ error: 'There is no zoo yet, please try again later.' })
        : res.json(results)
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong retrieving your zoos!' });
      console.error(err);
    });
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .then(result =>
      result.length
        ? res.json(result)
        : res.status(404).json({
            error: `We couldn't find any zoo with ID: ${id}. Please check the information submitted.`
          })
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong retrieving your zoo.' }),
        console.error(err);
    });
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  !name
    ? res.status(400).json({ error: 'Property "name" is required!' })
    : db('zoos')
        .where('id', id)
        .update({ name })
        .then(count =>
          count
            ? res.json(count)
            : res.status(404).json({
                error: `We couldn't find any zoo with ID: ${id}. Please check the information submitted.`
              })
        )
        .catch(err => {
          res
            .status(500)
            .json({ error: 'Something went wrong updating your zoo.' });
          console.error(err);
        });
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .del()
    .then(count =>
      count
        ? res.status(201).json(count)
        : res.status(404).json({
            error: `We couldn't find any zoo with ID: ${id}. Please check the information submitted.`
          })
    )
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Something went wrong deleting your zoo.' });
      console.error(err);
    });
});

server.listen(port, () =>
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
);
