//* Import Express and the db config/connection *// 
const express = require('express'); 
const db = require('../data/db-config'); 

//* create router *// 
const router = express(); 

//! GET all cars 
router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json({ data: cars});
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving data" });
        });
}); 

//* Now let's add some data to the cars table! *// 
//! POST a new car! 
//* For a POST we navigate to the /api/cars/ route, no ID is in the path because the new car doesn't have one yet! We will need a payload - the new car, which is found on req.body from the front end. Then we will INSERT the new car into the previously empty array *// 
router.post('/', (req, res) => {
    const newCar = req.body; 
    db('cars')
        .insert(newCar, 'id')
        .then(ids => {
            db('cars')
                .where({id:ids[0]})
                .first()
                .then(car => {
                    res.status(201).json({ data: car })
                });
        })
        .catch(err => {
            res.status(500).json({ message: "This car could not be added" })
        });
}); 

//* export the router *// 
module.exports = router; 
//! Don't forget to update server.js to reflect this new router! !// 