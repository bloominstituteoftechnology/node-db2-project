
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cars').truncate()

  await knex("cars").insert([
    { VIN: "12A34B", make: "Tesla", model: "Model 3", mileage: 10123.5, transmission: "automatic", title: "clean" },
    { VIN: "56B78C", make: "Jeep", model: "Wrangler", mileage: 60820.0, transmission: "manual", title: "clean" },
    { VIN: "90D12E", make: "Honda", model: "Civic", mileage: 120897.8, transmission: "manual", title: "salvage" },

	])
};
