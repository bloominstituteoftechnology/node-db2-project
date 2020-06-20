const randomVin = () => {
  return Math.floor(100000000 + Math.random() * 1700000000000000000)
}
// how can I add transmission type to seed data?
// how do I get the database to refresh
exports.seed = async function(knex){
  const testData = [
    {VIN:randomVin(), Make:"Mazda", Model:"cx-30", Mileage:1003, transmission_type:"automatic", title_status:"clean"},
    {VIN:randomVin(), Make:"volvo", Model:"xc-50", Mileage:84003, title_status:"unknown"},
    {VIN:randomVin(), Make:"BMW", Model:"x8", Mileage:42000, transmission_type:"manual", title_status:"clean"},
    {VIN:randomVin(), Make:"volvo", Model:"xc-40", Mileage:36200},
    {VIN:randomVin(), Make:"Mercedes", Model:"c class", Mileage:17800, transmission_type:"manual", title_status:"re-possessed"},
    {VIN:randomVin(), Make:"Acura", Model:"tlx", Mileage:22654 , transmission_type:"automatic"},
    {VIN:randomVin(), Make:"Ford", Model:"f150", Mileage:95587},
    {VIN:randomVin(), Make:"Kia", Model:"rio", Mileage:103335},
    {VIN:randomVin(), Make:"Hyundai", Model:"elantra", Mileage:54225, transmission_type:"unknown", title_status:"unknown"},
    {VIN:randomVin(), Make:"Mazda", Model:"3", Mileage:67114, transmission_type:"automatic", title_status:"clean"},
  ]
  
  await knex('cars').truncate()

  return knex('cars').insert(testData)
}

