// DO YOUR MAGIC
const { getAll, create } = require('./cars-model.js');

const carsController = {
    async getAll (req, res) {
        const allCars = await getAll();
    
        res.send(allCars);
    },
    getById (req, res) {
        res.send(req.locals.car);
    },
    async create (req, res) {
        const { vin, make, model, mileage, title, transmission } = req.body;

        // Array with a single value that is the created car's id
        const createCarResponse = await create({ vin, make, model, mileage, title, transmission });
        const createdCarId = createCarResponse.pop();
        const createdCar = { id: createdCarId, vin, make, model, mileage, title, transmission };

        res.send(createdCar)
    }
};

module.exports = carsController;