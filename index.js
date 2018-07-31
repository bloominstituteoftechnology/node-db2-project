const express = require('express');

//bring in knex
  //returns an instance of knex, by reading the developement key which states using 'sqlite3'
const db = require('./data/db');

const server = express();

server.use(express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/zoos', (req, res) => {
  //find me zoos in db, give me all the data, return a promise
  // @ts-ignore
  db('zoos').then(zoos => {
    res.status(200).json(zoos); //send back zoos (after.json)
  }).catch(err => res.status(500).json(err));
});

server.post('/zoos', (req, res) => {
  const zoo = req.body;
  // @ts-ignore
  db
    //insert data into db
    .insert(zoo).into('zoos')
      //ids (array of all new ids, per knex library) returned after inputed to db
    .then(ids => {
      const id = ids[0];
      //returns { new generated Id and ...copy of newInputData(zoo) }
      res.status(201).json({ id, ...zoo });
    })
    .catch(err => res.status(500).json(err));
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
