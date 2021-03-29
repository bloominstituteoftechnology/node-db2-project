const ExpressError = require('../ExpressError.js');
const express = require('express');
const Cars = require('./cars-model.js');


exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Cars.getById(req?.params?.id);
    if(car){
      req.car = car;
      next();
    } else {
      next(new ExpressError( ' Car with id is <car id> not found ', 404 ));
    }
  }
  catch (err){
    next(new ExpressError('body validation error: ' + err.message, 500))
  }
}

exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
 const newCar = req.body;
 if (!newCar.id && !newCar.vin && !newCar.make && !newCar.model && !newCar.mileage && !newCar.title && !newCar.transmission){
   const err = new ExpressError('<field name> is missing', 400)
   next(err);
 } else {
   next();
 }
}

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if(req.body.vin){
    next();
  }else {
    next(new ExpressError('Vin <vin number> is invalid', 400))
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const vinList = await Cars.getAll();
    const vinToCheck = req.body.vin;
    if( vinList.filter(data => data.vin === vinToCheck).length == 0 ){
      next();
    } else {
      next({ mesage :"vin <vin number> already exists", status: 400})
    }
  }
  catch(error) {
    next(new ExpressError('body validation error: ' + err.message, 500))
  }

}

