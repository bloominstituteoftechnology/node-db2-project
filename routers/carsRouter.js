const knex = require('knex');
const router = require ('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/carsdb.db3'
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex(knexConfig);

//C
router.post("/", async (req, res) => {
  try {
    const car = await db('cars');
    car.insert(req.body);
    if (car.vin = !null) {
      res.status(201).json(car);
    } else {
      res.status(400).json({
        message: "Please provide a vin for the car"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error adding the car"
    });
  }
});

//R
router.get('/', async (req, res) => {
  try {
      const cars = await db('cars');
      console.log(cars)
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the cars',
      });
    }
});
//U
//D

module.exports = router;