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

router.get('/:id', (req, res, next) => {
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

router.post('/', (req, res, next) => {
    const { name } = req.body;
    if(name) {
        zoosTable.add({ name })
            .then((zooId) => {
                res.status(201).json({"newZooId": zooId[0]});
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object attribute!"]);
    }
});

router.put('/:id', (req, res, next) => {
    const { name } = req.body;
    if(name) {
        zoosTable.update(req.params.id, { name })
            .then((zooCount) => {
                if(zooCount > 0) {
                    res.status(200).json({"updatedZoos": zooCount});
                } else {
                    next(["h404", "Zoo not found!"]);
                }
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object attribute!"]);
    }
});

router.delete('/:id', (req, res, next) => {
    zoosTable.remove(req.params.id)
        .then((zooCount) => {
            if(zooCount > 0) {
                res.status(200).json({"deletedZoos": zooCount});
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
