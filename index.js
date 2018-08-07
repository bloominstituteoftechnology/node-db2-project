const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
});

server.get('/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
  .where({ id })
  .then((zooAtId) => {
    res.status(200).json(zooAtId)
  })
  .catch(err => res.status(500).json(err));
});

// server.get('/zoos/:id', (req, res) => {
//   const { id } = req.params;
//   db.get(id).then(response => {
//     if (response.length < 1) {
//       res.status(404).json({ message: "The zoo with the specified ID does not exist."})
//     } else {
//       res.json(response)
//     }
//   })
//   .catch(() => {
//     res.status(500).json({ error: "The zoo informations could not be retrieved"})
//   })
// });

server.post('/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo).into('zoos').then(ids => {
    const id = ids[0];
    res.status(201).json({ id, ...zoo})
  })
  .catch(err => res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
