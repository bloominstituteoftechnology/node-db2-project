const db = require("../../data/knexConfig");

async function getCars() {
  const cars = await db("cars");
  return cars;
}

async function getCarByID(id) {
  const [cars] = await db("cars").where({ id });
  return cars;
}

async function insertCar(car) {
  const [id] = await db("cars").insert(car);
  return id;
}

async function updateCar(id, car) {
  const count = await db("cars").where({ id }).update(car);
  return count;
}

async function removeCar(id) {
  const count = await db("cars").where({ id }).del();
  return count;
}

module.exports = { getCars, insertCar, getCarByID, updateCar, removeCar };