const express = require('express');
const knex = require('knex');

const dbconfig = require('../knexfile');

const db = knex(dbconfig.development);
const router = express.Router();

router.get('/', (req, res) => {
    db.select().from('zoos')
    .then((zoos) => {
        res.status(200).json(zoos);
    })
    .catch((error) => {
        res.status(500).json({error: `Server had an error of ${error} trying to get zoos.`});
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('zoos').where('id', id).select()
    .then((zoo) => {
        if (zoo.length) {
            res.status(200).json(zoo);
        }
        else {
            res.status(404).json({message: `Could not find zoo with id ${id}`})
        }
    })
    .catch((error) => {
        res.status(500).json({error: `Server had an error of ${error} trying to get the zoo id of ${id}`});
    })
});

router.post('/', (req, res) => {
    const zoo = req.body;
    if (zoo.name) {
        db('zoos').insert(zoo)
        .then((zooID) => {
            res.status(201).json(zooID);
        })
        .catch((error) => {
            res.status(500).json({error: `Server had an error of ${error} trying to create a new zoo.`});
        })
    }
    else {
        res.status(400).json({message: 'Creating a new zoo requires a name field.'})
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db('zoos').where('id', id).delete()
    .then((rowsDeletedCount) => {
        res.status(200).json(rowsDeletedCount);
    })
    .catch((error) => {
        res.status(500).json({error: `Server had an error of ${error} trying to delete the zoo with id ${id}`});
    })
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const zooUpdates = req.body;
    if (zooUpdates.name) {
        db('zoos').where('id', id).update(zooUpdates)
        .then((rowsModifiedCount) => {
            res.status(200).json(rowsModifiedCount);
        })
        .catch((error) => {
            res.status(500).json({error: `Server had an error of ${error} trying to update the zoo with id ${id}.`});
        })
    }
    else {
        res.status(400).json({message: 'Editing a zoo requires a name field.'})
    }
});

module.exports = router;