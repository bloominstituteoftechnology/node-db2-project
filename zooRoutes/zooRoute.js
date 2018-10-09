const express = require('express');
const zoos = require('../data/zoosModel');

const router = express.Router();

router.get('/', (req, res) => {
    zoos.get().then(zoo => {
        if(!zoo || zoo < 1) {
          return res.status(404).send({message: 'There are no zoos.'});
        }

        res.status(200).json(zoo);
    }).catch(err => {
        res.status(500).json(err.message);
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);

    zoos.getById(id).then(zoo => {
        console.log(zoo);
        if(zoo) {
            console.log(zoo);
            res.status(200).json(zoo);
        } else {
            res.status(404).send({message: 'Zoo not found'});
        }
    }).catch(err => res.status(500).send(err));


});

router.post('/', (req, res) => {
    const zoo = req.body;

    zoos.post(zoo).then(ids => {
        res.status(201).json(ids);
    }).catch( err => {
        res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    zoos.update(id, changes).then(count => {
  
        if(!count || count < 1) {
            res.status(404).json({message: 'No records found to update'});
        } else {
            res.status(200).json(count);
        }
        
    }).catch(err => console.log(err));
});
  
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    zoos.remove(id).then(count => {
        if(!count || count < 1) {
            res.status(404).json({message: 'No records found to delete'});
        } else {
            res.status(200).json(count);
        }
    }).catch(err => console.log(err));
});
  
module.exports = router;