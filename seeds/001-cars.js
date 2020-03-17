
exports.seed = async function (knex) {
  const cars = [
    { VIN: "4816wa1f48466", make: "Toyota", model: "Corolla", mileage: 176000 },
    { VIN: "418wea1658466", make: "Mercedes-Benz", model: "C-230", mileage: 148000 },
  ]

  // Deletes ALL existing entries
  await knex('cars').truncate()
    
  return knex('cars').insert(cars);
    
};
