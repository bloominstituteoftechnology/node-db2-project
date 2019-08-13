const db = require('../data/dbConfig');

exports.validateCarId = async function(req, res, next) {
    const id = req.params.id;
    try {
        const [car] = await db('cars').where({ carId: id });
        if (car) next();
        else
            res.status(404).json({
                message: 'A car with that id does not exist.',
            });
    } catch (error) {
        next(error);
    }
};

exports.validateCarData = function(req, res, next) {
    const newCar = req.body;
    const { VIN, Make, Model, Mileage } = newCar;
    try {
        if (!VIN || !Make || !Model || !Mileage)
            return res.status(400).json({
                message:
                    'Please ensure you include the VIN, Make, Model, and Mileage are included.',
            });
        else
            next()
    } catch (error) {
        next(error);
    }
};
