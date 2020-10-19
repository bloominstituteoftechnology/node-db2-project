// VIN, MAKE, MODEL, MILEAGE, TRANSMISSION, STATUS

exports.seed = async function(knex) {
  await knex("cars").truncate()

  await knex("cars").insert([
    { vin: "4Y1SL65848Z411439", make: "Honda", model: "NSX", mileage: "26000", transmission: "manual", status: "clean" },
    { vin: "3R3FH36517D253251", make: "Nissan", model: "GT-R", mileage: "12000", status: "clean" },
    { vin: "2D3FH53145D312547", make: "Ford", model: "Mustang GT", mileage: "34000", transmission: "manual", status: "clean" },
    { vin: "5G2GH23626D213364", make: "Chevorlet", model: "Corvette", mileage: "3000", status: "clean" },
    { vin: "7D1SG54673D264782", make: "Tesla", model: "Roadster", mileage: "0", transmission: "self-driving", status: "salvage" },
    { vin: "3F7DH53763A246361", make: "Subaru", model: "WRX STI", mileage: "42000", transmission: "manual" },
  ])
}