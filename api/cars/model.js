const db = require("../../data/db_config.js");

module.exports = {
  getCars,
  getCarByDetail,
  addCar,
  updateCar,
  deleteCar
};

function getCars() {
  return db("cars");
}

function getCarByDetail(detail) {
  return db("cars")
    .where(detail)
    .first();
}

function addCar(car) {
  return db("cars")
    .insert(car, "id")
    .then(newCar => newCar)
    .catch(err => console.log("Something went wrong in adding a car: ", err));
}

function updateCar(carId, changes) {
  console.log(`carId: ${carId} -- changes: ${changes}`);
  return db("cars")
    .where("cars.id", carId)
    .update(changes)
    .then(() => getCarByDetail({ id: carId }))
    .catch(err => console.log("Something went wrong in updating a car: ", err));
}

function deleteCar(carId) {
  return db("cars")
    .where("cars.id", carId)
    .del();
}
