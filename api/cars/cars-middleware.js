const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const validCar = await Cars.getById(id);
    if(!validCar){
      res.status(404).json({
        message: `car with id ${id} is not found`
      });
    } else {
      req.car = validCar
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  
}

const checkVinNumberValid = (req, res, next) => {
  
}

const checkVinNumberUnique = (req, res, next) => {
  
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
