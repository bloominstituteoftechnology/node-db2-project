const router = require('express').Router();

const Zoos = require('./zoos-model');

router.get('/', (req, res) => {
    Zoos.find()
        .then(zoos => {
            res.status(200).json(zoons);
        })
        .catch(error => {
            res.status(500).json(error)
        });
});



