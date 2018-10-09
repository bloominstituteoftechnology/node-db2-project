const express = require('express');
const zoos = require('./zooModels.js');
const router = express.Router();

// getting all the zoo's
router.get('/', (req,res)=>{
    zoos
    .find()
    .then(zoo =>{
        res.status(200).json(zoo);
    })
    .catch(err => res.status(500).json(err));
});

// getting the singel zoo with an ID
router.get('/:id', async (req,res) =>{
try{
    const {id} = req.params;
    const zoo = await zoo.findById(id);
    if(zoo) {
        res.status(200).json(zoo);
    } else {
        res.status(404).json({message: 'Cannot find Zoo with that ID.' });
    }
} catch (err) {
    res.status(500).json(err)
}
});

// adding the zoo into the database
router.post('/', (req, res) => {
    const zoo = req.body;
    zoos
    .add(zoo)
    .then(id => {
        if(id > 0) {
            res.status(201).json(id);
        } else {
            res.status(404).json({message:'zack help 101'});
        }   
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
    const{id} = req.params;
    const changes = req.body;
    zoos
    .update(id,changes)
    .then(count =>{
        if(!count || count === 0 ) {
            res.status(404).json({message:'No Zoo to actually update.'});
        } else {
            res.status(200).json(zoo);
        }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    zoos
    .remove(id)
    .then(count => {
        if(!count || count === 0 ){
            res.status(404).json({message:'No Zoo to actually update.'});
        } else {
            res.status(200).json(zoo);
        }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;