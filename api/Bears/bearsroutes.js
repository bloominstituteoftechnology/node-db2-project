const express = require('express');
const bearsTable = require('../../data/bearsModel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes
router.get('/', (req, res, next) => {
    bearsTable.find()
        .then((bearList) => {
            res.status(200).json(bearList);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.get('/:id', (req, res) => {
    bearsTable.find(req.params.id)
        .then((bear) => {
            if(bear) {
                res.status(200).json(bear);
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
