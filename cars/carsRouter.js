//* Import Express and the db config/connection *// 
const express = require('express'); 

//* create router *// 
const router = express.Router(); 
const db = require('../data/db-config'); 


//! GET all cars !// ☑
router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json({ data: cars});
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving data" });
        });
}); 

//! GET car by id !// ☑
router.get('/:id', (req, res) => {
    const { id } = req.params; 

    db('cars')
        .where({ id })
        .first()
        .then(car => {
            res.status(200).json({ data: car }); 
        })
        .catch(err => {
            res.status(500).json({ message: "A car with this ID could not be found" }); 
        }); 
}); 

//! DELETE a car !// ☑
//* for a DELETE we need the id of the item we wish to delete from the table - this comes from the req.params *// 
router.delete('/:id', (req, res) => {
    const { id } = req.params; 

    db('cars')
        .where({ id })
        .del()
        .then(count => {
            if(count > 0){
                res.status(204).json({ data: count });
            } else {
                res.status(404).json({ message: "A car with this ID could not be found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error deleting the record" }); 
        })
}); 

//! PUT update a car !// ☑
//* for a PUT we need: the ID of the item being updated, and the proposed updates. The ID comes from req.params, and the changes will be on req.body *// 
router.put('/:id', (req, res) => {
    const { id } = req.params; 
    const changes = req.body; 

    db('cars')
        .update(changes)
        .where({ id })
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count });
            } else {
                res.status(404).json({ message: "Car with this ID could not be found" }); 
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error updating this car" });
        });
});


//! POST a new car! !// ☑
//* For a POST we navigate to the /api/cars/ route, no ID is in the path because the new car doesn't have one yet! We will need a payload - the new car, which is found on req.body from the front end. Then we will INSERT the new car into the previously empty array *// 

router.post('/', (req, res) => {
    const newCar = req.body; 
    console.log(newCar); 
    db('cars')
        .insert(newCar, 'id')
        .then(ids => {
            db('cars')
                .where({ id:ids[0] })
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
//! Don't forget to update server.js to reflect this new router! REMEMBER order matters!!!!!! !// 