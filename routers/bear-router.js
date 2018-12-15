const express = require('express');
const knex = require('knex');

const dbconfig = require('../knexfile');

const db = knex(dbconfig.development);
const router = express.Router();

router.get('/', (req, res) => {
    db.select().from('bears')
    .then((bearss) => {
        res.status(200).json(bearss);
    })
    .catch((error) => {
        res.status(500).json({error: `Server had an error of ${error} trying to get bears.`});
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('bears').where('id', id).select()
    .then((bear) => {
        res.status(200).json(bear);
    })
    .catch((error) => {
        res.status(500).json({error: `Server had an error of ${error} trying to get the bear id of ${id}`});
    })
});

router.post('/', (req, res) => {
    const bear = req.body;
    if (bear.name) {
        db('bears').insert(bear)
        .then((bearID) => {
            res.status(201).json(bearID);
        })
        .catch((error) => {
            res.status(500).json({error: `Server had an error of ${error} trying to add a new bear.`});
        })
    }
    else {
        res.status(400).json({message: 'Adding a new bear requires a name field.'})
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db('bears').where('id', id).delete()
    .then((rowsDeletedCount) => {
        res.status(200).json(rowsDeletedCount);
    })
    .catch((error) => {
        res.status(500).json({error: `Server had an error of ${error} trying to delete the bear with id ${id}`});
    })
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const bearUpdates = req.body;
    if (bearUpdates.name) {
        db('bears').where('id', id).update(bearUpdates)
        .then((rowsModifiedCount) => {
            res.status(200).json(rowsModifiedCount);
        })
        .catch((error) => {
            res.status(500).json({error: `Server had an error of ${error} trying to update the bear with id ${id}.`});
        })
    }
    else {
        res.status(400).json({message: 'Editing a bear requires a name field.'})
    }
});

module.exports = router;