
const faker = require('faker');

exports.seed = async function(knex) {
  await knex("car-dealer").truncate();
  await knex("car-dealer").insert([
    {
      VIN: faker.vehicle.vin(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      transmission: faker.vehicle.type(),
      status: faker.vehicle.fuel()
     },
     {
      VIN: faker.vehicle.vin(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      transmission: faker.vehicle.type(),
      status: faker.vehicle.fuel()
     },
     {
      VIN: faker.vehicle.vin(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      transmission: faker.vehicle.type(),
      status: faker.vehicle.fuel()
     },
     {
      VIN: faker.vehicle.vin(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      transmission: faker.vehicle.type(),
      status: faker.vehicle.fuel()
     }
  ])
};
