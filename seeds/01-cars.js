const randomVin = () => {
  return Math.floor(100000000 + Math.random() * 1700000000000000000)
}
// how can I add transmission type to seed data?
// how do I get the database to refresh
exports.seed = async function(knex){
  const testData = [
    {VIN:randomVin(), Make:"Mazda", Model:"cx-30", Mileage:1003},
    {VIN:randomVin(), Make:"volvo", Model:"xc-50", Mileage:84003},
    {VIN:randomVin(), Make:"BMW", Model:"x8", Mileage:42000},
    {VIN:randomVin(), Make:"volvo", Model:"xc-40", Mileage:36200},
    {VIN:randomVin(), Make:"Mercedes", Model:"c class", Mileage:17800},
    {VIN:randomVin(), Make:"Acura", Model:"tlx", Mileage:22654},
    {VIN:randomVin(), Make:"Ford", Model:"f150", Mileage:95587},
    {VIN:randomVin(), Make:"Kia", Model:"rio", Mileage:103335},
    {VIN:randomVin(), Make:"Hyundai", Model:"elantra", Mileage:54225},
    {VIN:randomVin(), Make:"Mazda", Model:"3", Mileage:67114},
  ]
  
  await knex('cars').truncate()

  return knex('cars').insert(testData)
}

