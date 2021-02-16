const db = require('../../data/db-config');

async function get() {
    const cars = await db("cars");
    return cars;
}

async function insert(car) {
    const [id] = await db("cars").insert(car)
    return id;
}

async function update(id, car) {
    const count = await db("cars").where({id}).update(car);
    return count
}

async function remove(id) {
    const count = await db("cars").where({id}).del();
    return count;
}

module.exports = {getCars,insertCar,updateCar,removeCar}