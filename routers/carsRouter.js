const router = require ('express').Router();
const db = require('../data/dbConfig')

//C
router.post("/", async (req, res) => {
  // console.log(req.body)
  try {
    const [id] = await db('cars').insert(req.body);
    const newCarEntry = await db('cars').where({ id });
    // car.insert(req.body);
    // if (car === true) {
      res.status(201).json(newCarEntry);
    // } else {
      // res.status(400).json({
      //   message: "Please provide a vin for the car"
      // });
    // }
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