// STRETCH
const cars = [
  {
    vin: "1111111111111111",
    make: "toyota",
    model: "prius",
    mileage: 215000,
    title: "clean",
    transmission: "manual",
  },

  {
    vin: "222222222222222222",
    make: "toyota",
    model: "corolla",
    mileage: 115000,
    title: "salvage",
    transmission: "manual",
  },

  {
    vin: "33333333333333333",
    make: "ford",
    model: "focus",
    mileage: 215000,
  },
];

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(cars);
};
