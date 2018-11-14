const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const { name } = req.body
  if (!name) {
    req.statusCode(400).json({ message: "Provide name"})
  } else {
    db('zoos')
      .insert(req.body)
      .returning('id')
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(error => {
        res.status(500).json({ message: "There was an error while saving" })
      })
  }
})

server.get('/', (req, res) => {
  res.send({ message: "API is running :D" })
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .where({ id: id })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(error => {
      res.status(500).json({ message: "Information could not be retrieved" })
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id: id })
    .then(zoo => {
      res.status(200).json(zoo)
    .catch(error => {
      res.status(500).json({ message: "Information could not be retrieved", error: error})
    })
})









const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
