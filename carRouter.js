const express = require("express");

const db = require("./data/dbConfig.js");

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
      const cars = await db.select('*').from('cars');  
      res.status(200).json(cars);
    } catch (err) {      
      res.status(500).send('Problem with database')
    }
  })

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const car = await db
        .select('*')
        .from('cars')
        .where({ id });  
      if (!car[0]) {
        res.status(404).json({ msg: 'ID does not exist' })
      }  
      res.status(200).json(car);
    } catch (err) {      
      res.status(500).send('Server Error')
    }
  })

  router.post('/', async (req, res) => {    
    const { body } = req;
    const { vin, make, model, mileage } = body  
    if (!vin || !make || !model || !mileage) {
      res
        .status(400)
        .json({ msg: 'VIN, make, model, and mileage are required fields' })
    }
    try {
      const newCarId = await db('cars').insert(body);
      const newCar = await db
        .select('*')
        .from('cars')
        .where({ id: `${newCarId}` })  
      res.status(201).json(newCar)
    } catch (err) {      
      res.status(500).send('Server Error');
    }
  })
  
  router.put('/:id', async (req, res) => {
    const { body } = req
    const { id } = req.params
    try {
      const updatedCarID = await db('cars')
        .where({ id })
        .update(body);  
      const updatedCar = await db
        .select('*')
        .from('cars')
        .where({ id })  
      if (!updatedCarID) {
        res.status(404).json({ msg: 'ID does not exist' });
      }  
      res.status(201).json(updatedCar);
    } catch (err) {      
      res.status(500).send('Server Error');
    }
  });
    
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await db('cars')
        .where({ id })
        .del()  
      if (!deleted) {
        res.status(404).json({ msg: 'Car was not found' });
      }  
      res.status(201).json({ msg: 'This car was deleted' });
    } catch (err) {      
      res.status(500).send('Server Error');
    }
  });

module.exports = router;