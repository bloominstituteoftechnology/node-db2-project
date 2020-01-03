exports.seed = async function(knex) {
    await knex("cars").truncate() //resets info on table, does not delete 'del()'
    await knex("cars").insert([
        {VIN: "123A4567BC89", make: "Jeep", model: "Compass Trailhawk", mileage: "12462"},
        {VIN: "1011D1212EF314P", make: "Honda", model: "Accord", mileage: "41812"},
        {VIN: "1516G17181HI920Q", make: "Chevrolet", model: "Equinox", mileage: "7685"},
        {VIN: "2122J232425KL2627R", make: "Ford", model: "Expedition", mileage: "26597"},
        {VIN: "2829M30313NO233S", make: "Hyundai", model: "Sonata", mileage: "45233"},
    ])
}