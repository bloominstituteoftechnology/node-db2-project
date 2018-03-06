const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/', (req, res) => {
    res.status(200).json({ api: `running...` });
});

server.get('/zoos', (req, res) => {
    const { id } = req.params;
    knex('zoos')
    .where('id', id)
    .then(function(zoos) {
        if(zoos.length > 0) {
            res.status(404).json({ msg: `Zoo with id ${ id } does not exist` })
        }
    res.status(201).json(zoos);
    })
    .catch(function(err) {
        res.status(500).json({msg: `Error retrieving the zoos`})
    })
})

server.post('/zoos', (req, res) => {
    const { zoo } = req.body;

    knex.insert(zoo)
    .into('zoos')
    .then(function(ids) {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({ msg: `Error loading the zoo` })
    })
});

server.post('/bears', (req, res) => {
    const { zooId, species, latinName };
    const bear = { zooId, species, latinName };
    console.log(bear);
    knex
    .insert(bear)
    .into('bears')
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({ msg: `There was a problem saving your bear` })
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${ port }`);
});
