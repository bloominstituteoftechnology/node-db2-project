const db = require("../../data/db_config.js");

module.exports = {
  getCars,
  getCarByDetail,
  addCar,
  updateCar,
  deleteCar,
  getSales,
  getSaleByDetail,
  addSales,
  updateSales,
  deleteSales
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

function getSales() {
  return db("sales");
}

function getSaleByDetail(detail) {
  return db("sales")
    .where(detail)
    .first();
}

function addSales(sales) {
  return db("sales")
    .insert(sales, "id")
    .then(newsales => newsales)
    .catch(err => console.log("Something went wrong in adding a sale: ", err));
}

function updateSales(salesId, changes) {
  return db("sales")
    .where("sales.id", salesId)
    .update(changes)
    .then(() => getsalesByDetail({ id: salesId }))
    .catch(err =>
      console.log("Something went wrong in updating a sale: ", err)
    );
}

function deleteSales(salesId) {
  return db("sales")
    .where("sales.id", salesId)
    .del();
}
