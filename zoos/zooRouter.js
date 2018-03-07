const express = require('express');
const knex = require('../database/db.js');
const zoo_db = require('./zooController.js')

const zooRouter = express.Router();


zooRouter.post('/', (req, res) => {
    const zoo = req.body;

    zoo_db
        .addZoo(zoo)
        .then(ids => {
            res.status(201).json({ ids })
        })
        .catch(error => {
            res.status(500).json({ message: 'error' });
        });
});

zooRouter.get('/', (req, res) => {
    zoo_db
        .getAll()
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving Zoos' });
        });
});

zooRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    zoo_db
        .getById(id)
        .then(zoos => {
            if (zoos.length > 0) {
                res.status(200).json(zoos);
            } else {
                res.status(404).json({ message: `Zoo with id: ${id} does not exist` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving Zoos' });
        });
});


zooRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const zoo = req.body;
    zoo_db
        .update(zoo)
        .then(response => {
            res.status(200).json({ success: true });
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not update this Zoo' })
        });
});

zooRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    zoo_db
    .erase(id)
        .then(response => {
            res.status(200).json({ success: true });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting this Zoo' })
        });
});

module.exports = zooRouter;