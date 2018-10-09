const express = require('express');
const zoos = require('./zoosModel');
const router = express.Router();

router.get('/', (req, res) => {
    zoos
        .find()
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    zoos
        .findById(id)
        .then(zoo => {
            res.status(200).json(zoo);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    const zoo = req.body;

    zoos
        .add(zoo)
        .then(ids => {
            if (!zoo.name) {
                res.status(400).send({ error: "Please provide a name for the zoo"})
            }
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    zoos
        .update(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not update" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    zoos
        .remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not remove" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;