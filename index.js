const express = require('express');
const knex = require('knex')
const helmet = require('helmet');
const server = express();

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req,res) => res.send({"Zoo API": "live"}));

server.get('/api/zoos', (req, res) => {
    db('zoos')
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({message: "The zoos information could not be retrieved", err}));
});

server.get('/api/zoos/:id', (req, res) => {
    const {id} = req.params;
    db('zoos').where('id', Number(id)).first()
    .then(zoo => {
        if (zoo) {
            res.status(200).json(zoo)
        } else {
            res.status(404).json({message: "The zoo with the provided ID does not exist"})
        }
    })
    .catch(err => res.status(500).json({message: "The zoo information could not be retrieved", err}));
});

server.post('/api/zoos', (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "Please provide a name for the zoo"});
    } else {
        db('zoos')
        .insert(req.body)
        .returning('id')
        .then(ids => {
          res.status(201).json(ids);
        })
        .catch(err => {
          res.status(500).json({ message: 'Error inserting', err });
        });
    }
});

server.put('/api/zoos/:id', (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({message: "Please provide a name for the zoo"});
    } else {
        db('zoos')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({message: "The zoo with the specified ID does not exist."});
            }
        })
        .catch(err => res.status(500).json({message: "The zoo could not be updated", err}));
    }
});

server.delete('/api/zoos/:id', (req, res) => {
    const {id} = req.params;
    db('zoos')
      .where({ id: id })
      .del()
      .then(count => {
        if (count) {
            res.status(200).json(count)
        } else {
            res.status(404).json({message: "The zoo with the provided ID does not exist"})
        }
      })
      .catch(err => res.status(500).json(err));
});

const port = process.env.PORT || 9000;
server.listen(port, function() {console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)});