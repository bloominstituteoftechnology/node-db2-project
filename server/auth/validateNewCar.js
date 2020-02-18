module.exports = validateNewCar;

function validateNewCar (req, res, next) {
    const newCar = req.body;

    if(Object.keys(newCar).length === 0){
        res.status(400).json({ message: "Missing new account data." })
    } else if (!newCar.vin || !newCar.make || !newCar.model || !newCar.mileage) {
        res.status(400).json({ message: "New car requires: VIN, make, model, and mileage fields." })
    } else {
        next();
    }
}