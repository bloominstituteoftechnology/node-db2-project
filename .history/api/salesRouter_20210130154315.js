const express = require("express");

const router = express.Router();

//imported db
const dbDealer = require('../data/dbDealer');

//imported dbSales
const dbSales = require('../data/dbSales');


router.get('/', (req, res, next)=>{
    res.status(200).json({message: `Hello from root sales`})
})

router.post('/sell/:id', vehicleValidator(), async (req, res, next)=>{

    res.status(200).json({message: `vehicle was validated`})
})

//middleware

function vehicleValidator(){

    return (req, res, next)=>{
        dbDealer.getByID(req.params.id)
        .then( vehicle =>{
            if (vehicle) {
                req.vehicle = vehicle
                next()
            }else{
                res.status(400).json({$ERR: `Vehicle could not be found!`})
            }
        }).catch(next)
    }
}




module.exports = router