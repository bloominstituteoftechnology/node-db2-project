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