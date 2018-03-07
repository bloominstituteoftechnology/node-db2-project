const express = require('express');
const knex = require('../database/db.js');

const bearRouter = express.Router();

bearRouter.post('/', (req, res) => {
    const bear = req.body;

    knex
        .insert(bear).into('bears')
        .then(ids => {
            res.status(201).json({ ids });
        })
        .catch(error => {
            res.status(500).json({ message: 'error' })
        });
});

bearRouter.get('/', (req, res) => {
    knex('bears')
        .then(bears => {
            res.status(200).json({ bears });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving Bears' })
        });
});

bearRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    knex('bears')
        .where('id', id)
        .then(bears => {
            if (bears.length > 0) {
                res.status(200).json(bears);
            } else {
                res.status(404).json({ message: `Bear with id: ${id} does not exist` });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error retrieving Bears' });
        });
});

bearRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const bear = req.body;
    knex('bears').where({ id }).update(bear)
        .then(response => {
            res.status(200).json({ success: true });
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not update this Bear' })
        });
});

bearRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    knex('bears').where('id', id).del()
        .then(response => {
            res.status(200).json({ success: true });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting this Bear' })
        });
});

module.exports = bearRouter;