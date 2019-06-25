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


router.get('/:id', (req, res) => {
    Zooz.getById(req.params.id)
        .then(zoos => {
            if (zoos) {
                res.status(200).json(zoos);
            } else {
                res.status(404).json({ message: 'Zoos not found'})
            }
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});

reouter.post('/', (req, res) => {
    Zoos.add(req.body)
        .then(zoos => {
            res.status(200).json(zoos);
        })
        .catch(error => {
            res.status(500).json(error)
        })
});
