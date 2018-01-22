const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/', function(req, res) {
    res.status(200).json({ success: true });
});

server.get('/api/zoos, function(req, res) {
    const zoos = knex('zoos')
    .then(function(zoos) {
        res.status(200).json(zoos);
    })
    .catch(function() {
        res.status(500).json({ errorMessage: 'Could not get the Zoos' });
    });
});

server.post('api/zoos', function(req, res) {
    // new route handler
    const zoo = req.body; 

    knex
      .insert(zoo)
      .into('zoos')
      .then(function(ids) {
          res.status(201).json({ ids });
      })
}

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});

// raw connector || query builder || ORM: Object Relational Mapper
// SQL Injection

const bear = { 
    name: 'Po',
    species: 'Panda',
    latinName: 'ursus kunfusious',
    partners: [
        { name: 'asfsd', species: 'monkey' },
    ]
};
