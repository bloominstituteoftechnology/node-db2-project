const express = require('express');
const knex = require('knex');
const router = express.Router();

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

router.post('/', (req, res) => {
    const bear = req.body;
    db('bears').insert(bear)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to insert bear"});
    });
});

router.get('/', (req, res) => {
    db('bears')
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get bears"});
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('bears').where('id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get bear"});
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const bear = req.body;
    db('bears').where('id', id).update(bear)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to update bear"});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('bears').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to delete bear"});
    });
});

module.exports = router;