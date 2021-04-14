const cars = require("./cars-model.js")
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
    const car = await cars.getById(req.params.id)
    if (!car || Object.keys(car).length === 0){
        return res.status(404).json({message:"car with id <car id> is not found"});
    }
    next();
}

const checkCarPayload = (req, res, next) => {
    if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage){
        var msg = "";
        if (!req.body.vin){
            msg += "vin ";
        }
        if (!req.body.make){
            msg += "make ";
        }
        if (!req.body.model){
            msg += "model ";
        }
        if (!req.body.mileage){
            msg += "mileage ";
        }
        msg += "is missing";
        return res.status(400).json({message:msg});
    }
    next()
}

const checkVinNumberValid = (req, res, next) => {
    const isValid = vinValidator.validate(req.body.vin)
    if(!isValid){
        return res.status(400).json({message: `vin ${req.body.vin} is invalid`});
    }
    next()
}

const checkVinNumberUnique = async (req, res, next) => {
    const allCars = await cars.getAll()
    if (allCars.some(car=>car.vin == req.body.vin && car.id != req.params.id)){
        return res.status(400).json({message: `vin ${req.body.vin} already exists`});
    }
    next()
}

module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}
