const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js');

const server = express();

server.use(bodyParser.json());
// endpoints here

server.get('/', function(req, res) {
    res.status(200).json({ api: "running..." });
})

server.post('/zoos', function(req, res) {
    const zoo = req.body;

    knex
    .insert(zoo)
    .into('zoos')
    .then(function(ids) {
        res.status(201).json(ids);
    })
    .catch(function(err) {
        res.status(500).json({ msg: 'Error inserting the zoo'});
    });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
