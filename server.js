const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

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

server.post('/zoos', function(req, res) {
    const zoo = req.body;
    knex
        .insert(zoo)
        .into('zoos')
        .then(function(ids) {
            res.status(201).json({ ids: ids });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Zoo already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.put('/zoos/:id', function(req, res) {
    knex('zoos')
        .where('id', req.params.id)
        .update(req.body)
        .then(function(count) {
            res.status(200).json({ updated: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422)
                    .json({ error: 'The Zoo already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.delete('/zoos/:id', function(req, res) {
    knex('zoos')
        .where('id', req.params.id)
        .del()
        .then(function(count) {
            res.status(200).json({ deleted: count });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The Zoo already exist' });
            } else {
                res.status(500).json(err);
            }
        });
});

server.get('/', function(req, res) {
    knex('zoos')
        .join('bears')
        .select('zoos.*', 'bears.species')
        .then(function(records) {
            res.status(200).json(records);
        });
});

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
