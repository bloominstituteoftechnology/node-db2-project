const db = require('../../data/db-config')
const Cars = require('./cars-model')
// const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}