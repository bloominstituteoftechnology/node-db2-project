const express = require("express");
const db = require("../data/db-config");

const router = express.Router();

router.get ('/', (req,res)=>{
    db('cars')
    .then(cars=>{
        res.json(cars);
    })
    .catch(err =>{
        res.status(500).json({message: "Failed to retreive data"})
    })
});

router.get('/:id', (req, res)=>{
    const {id}= req.params;
    db("cars").where({id}).first()
    .then(cars =>{
        res.json(cars);
    })
    .catch( err=>{
        res.status(500).json({message: "Failed to retreive cars by id" })
    });

});
router.post('/', (req,res)=>{
    const carsData= res.body;
    db('cars').insert(carsData)
    .then(ids =>{
        db('cars').where( { id: ids[0]})
        .then(newCarsEntry => {
            res.status(201).json(newCarsEntry);
        })
    })
    .catch(err =>{
        console.log('Post error', err);
        res.status(500).json({message: "Failed to store data"})
    });
});
module.exports = router;