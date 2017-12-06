const express = require('express');
const bodyParser = require('body-parser');

const config = require('./knexfile.js');
const knex  = require ('knex')(config.development);
const sqlite = require ('sqlite3');
const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/zoos', function(req, res) {
    const zoos = knex('zoos')
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

server.get('/zoos/:id', function(req, res) {
    const { id } = req.params;
    const zoos = knex('zoos')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
