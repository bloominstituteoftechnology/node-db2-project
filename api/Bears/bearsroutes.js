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

router.get('/:id', (req, res, next) => {
    bearsTable.find(req.params.id)
        .then((bear) => {
            if(bear) {
                res.status(200).json(bear);
            } else {
                next(["h404", "Bear not found!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.post('/', (req, res, next) => {
    const { name } = req.body;
    if(name) {
        bearsTable.add({ name })
            .then((bearId) => {
                res.status(201).json({"newBearId": bearId[0]});
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
        bearsTable.update(req.params.id, { name })
            .then((bearCount) => {
                if(bearCount > 0) {
                    res.status(200).json({"updatedBears": bearCount});
                } else {
                    next(["h404", "Bear not found!"]);
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
    bearsTable.remove(req.params.id)
        .then((bearCount) => {
            if(bearCount > 0) {
                res.status(200).json({"deletedBears": bearCount});
            } else {
                next(["h404", "Bear not found!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.use(errorHandler);

module.exports = router;
