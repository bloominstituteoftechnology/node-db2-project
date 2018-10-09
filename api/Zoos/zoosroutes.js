const express = require('express');
const zoosTable = require('../../data/zoosModel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes
router.get('/', (req, res, next) => {
    zoosTable.find()
        .then((zooList) => {
            res.status(200).json(zooList);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.get('/:id', (req, res) => {
    zoosTable.find(req.params.id)
        .then((zoo) => {
            if(zoo) {
                res.status(200).json(zoo);
            } else {
                next(["h404", "Zoo not found!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.use(errorHandler);

module.exports = router;
