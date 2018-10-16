//Zoo Routes
const express = require('express');
const router = express.Router();

// const actionModel = require('../data/helpers/actionModel.js');

//Middleware for zoos

// GET all zoos
router.get('/', (req, res) => {
    zooModel.get().then(zoos => {
        console.log(zoos);
        res.status(200).json(zoos);
     })
    .catch(error => res.status(500).send({ error: "The zoos information could not be retrived."}));
});

// GET zoos by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    zooModel.get(id).then(zoo => {
        if(zoo.length === 0) {
            return res.status(404).send({ message: "The zoo with the specified id does not exist." });
        }
        res.status(200).json(zoo);
    })
    .catch(error => res.status(500).send({ error: "The zoo information could not be retrieved." }));
});

// //Post new zoo
router.post('/', (req, res) => {
    const { name } = req.body;
    const newZoo = { name };
    zooModel.insert(newZoo).then(zooId =>
        res.status(200).json(newZoo)
    )
    .catch(error => {
        if(!name) {
            return res.status(400).send({ errorMessage: "Please provide a name to create a new zoo." });
        } else {
            res.status(500).send({ error: "There was an error while saving the new zoo to the database." });
        }
    })
})

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    zooModel.remove(id).then(deletedZoo => {
        if(!deletedZoo) {
            return res.status(404).send({ Error: "The zoo with the specified ID does not exist." });
        } else {
            res.status(200).json({ message: "You successfully deleted the zoo." });
        }
    })
    .catch(error => res.status(500).send({ error: "The zoo failed to delete." }));
 });

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newZoo = { name };
    zooModel.update(id, newZoo).then(zoo => {
        console.log(zoo);
        if(!name) {
            res.status(400).send({ errorMessage: "Please provide a name for the zoo." })
        } else {
            res.status(200).json(req.body);
        }})
        .catch(error => res.status(500).send({ error: "The zoo information could not be modified."}))
    });

    module.exports = router;