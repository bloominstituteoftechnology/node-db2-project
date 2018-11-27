const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
    const name = req.body;
    db.insert(name)
        .into('zoos')
        .then(id => {
            res.status(201).json(id[0]);
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong.' });
        });
});
// GET Zoos
server.get('/api/zoos', (req, res) => {
    db.select('*')
        .from('zoos')
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

const port = 3300;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


// Angelo Deleon FSW14 11/27/18