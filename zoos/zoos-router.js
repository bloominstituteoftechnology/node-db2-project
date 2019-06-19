const Zoos = require('./zoos-model');

const router = require('express').Router();





// router.get('/', (req, res) => {
//     db('zoos')
//     .then(zoos => {
//         res.status(200).json(zoos);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });




router.post('/', (req, res) => {
    Zoos.add(req.body)
        .then(zoos => {
            res.status(201).json(zoos)
        })
        .catch(err = res.status(500).json({ message: 'Useful error message' }))
})

router.get('/api/zoos', (req, res) => {
    Zoos.find()
        .then(zoos => res.status(200).json(zoos))
        .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Zoos.findById(id)
        .then(zoos => {
            if (zoos) {
                res.status(200).json(zoos)
            } else {
                res.status(404).json({ message: 'No Zoo with specified id exists' })
            }
        })
});

router.delete('/api/zoos/:id', (req, res) => {
    Zoos.remove(req.params.id)
        .then(zoos => {
            if (zoos) {
                res.status(201).json(zoos)
            } else {
                res.status(404).json({ message: 'There is no zoo with the specified id' })
            }
        })
});

router.put('/api/zoos/:id', (req, res) => {
    Zoos.update(req.params.id, req.body)
        .then(zoos => {
            if (zoos) {
                res.status(200).json(zoos)
            } else {
                res.status(404).json({ message: 'There is no zoo with specified id' })
            }
        })
});


module.exports = router;