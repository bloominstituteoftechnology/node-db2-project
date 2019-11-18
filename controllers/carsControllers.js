import { dbConfig as db } from '../data/db-config'

export const getAll = async (req, res) => {
  try {
    const cars = await db('cars')
    res.status(200).json(cars)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const getOne = async (req, res) => {
  const car = req.car
  res.status(200).json(car)
}

export const makeOne = async (req, res) => {
  try {
    const fruitData = req.body;
    const newId = await db('cars').insert(fruitData)
    const newCar = await db('cars').where({ id: newId[0] })
    res.status(201).json(newCar)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  } 
}

export const changeOne = async (req, res) => {
  const id = req.car.id
  const changes = req.body
  try {
    await db('cars').where('id', id).update(changes)
    const updatedCar = await db('cars').first().where('id', id)
    res.status(200).json(updatedCar)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}

export const removeOne = async (req, res) => {
  const id = req.car.id
  console.log(req.car)
  try {
    await db('cars').where('id', id).del()
    const cars = await db('cars')
    res.status(200).json(cars);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      errorMessage: `${err}`
    })
  }
}