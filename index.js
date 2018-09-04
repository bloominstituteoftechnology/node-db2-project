const express = require('express');
const helmet = require('helmet');

const server = express();

const db = require('knex')(require('./knexfile').development);

server.use(express.json());
server.use(helmet());

// endpoints here
server
  .route('/api/zoos')
  .get((req, res, next) => {
    db('zoos')
      .then(data => res.status(200).json(data))
      .catch(next);
  })
  .post((req, res, next) => {
    if (!req.body.name)
      return res.status(400).json({ message: 'Please provide a name' });

    db('zoos')
      .insert({ name: req.body.name })
      .then(data => res.status(201).json(data))
      .catch(next);
  });

server
  .route('/api/zoos/:id')
  .get((req, res, next) => {
    db('zoos')
      .where({ id: req.params.id })
      .then(data => {
        if (!data.length)
          return res
            .status(404)
            .json({ message: 'The zoo with the specified ID cannot be found' });

        res.status(200).json(data);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    if (!req.body.name)
      return res.status(400).json({ message: 'Please provide a name field.' });

    db('zoos')
      .update({ name: req.body.name })
      .where({ id: req.params.id })
      .then(data => {
        if (!data)
          return res
            .status(404)
            .json({ message: 'The zoo with the specified ID cannot be found' });

        res
          .status(200)
          .json({ message: 'Record updated successfully', count: data });
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    db('zoos')
      .delete()
      .where({ id: req.params.id })
      .then(data => {
        if (!data)
          return res
            .status(404)
            .json({ message: 'The zoo with the specified ID cannot be found' });

        res
          .status(200)
          .json({ message: 'Record deleted successfully', count: data });
      });
  });

server.use(function(err, _, res, _) {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong. Try again later. ' });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
