
const checkCarId =async (req, res, next) => {
  try{
    const car = await Car.getById(req.params.id)
    if(car){
      req.car = car
      next()
    }else{
      res.status(404).json(`{ message: "car with id <car id> is not found" }`)
    }
  } catch{
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const {title, contents} = req.body 
  if(title && contents){
    next()
  } else {
    res.status(400).json(`{ message: "<field name> is missing" }` )
  }
 }

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}
