const express = require('express');
const knex = require('knex');
const router = express.Router();

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

router.post('/', (req, res) => {
    const zoo = req.body;
    db('zoos').insert(zoo)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to insert zoo"});
    });
});

router.get('/', (req, res) => {
    db('zoos')
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get zoos"});
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('zoos').where('id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get zoo"});
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const zoo = req.body;
    db('zoos').where('id', id).update(zoo)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to update zoo"});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('zoos').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to delete zoo"});
    });
});

// special endpoint get bears in zoo by zoo id
router.get('/:id/bears', (req, res) => {
    const id = req.params.id;
    db('bears as b')
        .join('zoos as z', 'z.id', 'b.zoo_id')
        .select('b.id as BearID', 'b.name as BearName', 'z.name as ZooName')
        .where('z.id', id)
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get bears from zoo"});
    });
});

module.exports = router;