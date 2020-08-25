
exports.seed =  async function(knex) {
  await knex("cars").insert([
    {Vin: 3244444, Make: "Toyota",Model: "Camry",Mileage: 2000 },
    {Vin: 3567567, Make: "Honda",Model: "Accord",Mileage: 0, Transmission: "New", Car_Title:"Clean Af"  }
   
  ])
};
