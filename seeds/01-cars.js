const randomVin = () => {
  return Math.floor(100000000 + Math.random() * 1700000000000000000)
}

// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('cars').truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex('cars').insert([
//         {VIN:25132151515151, Make:"Mazda", Model:"cx-30", Mileage:1003},

//       ]);
//     });
// };


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

// {VIN:randomVin(), Make:"Mazda", Model:"cx-30", Mileage:1003},
// {VIN:randomVin(), Make:"volvo", Model:"xc-50", Mileage:84003},
// {VIN:randomVin(), Make:"BMW", Model:"x8", Mileage:42000},
// {VIN:randomVin(), Make:"volvo", Model:"xc-40", Mileage:36200, "Transmission Type":"automatic"}, ,
// {VIN:randomVin(), Make:"Mercedes", Model:"c class", Mileage:17800},
// {VIN:randomVin(), Make:"Acura", Model:"tlx", Mileage:22654, "Transmission Type":"automatic"},
// {VIN:randomVin(), Make:"Ford", Model:"f150", Mileage:95587, "Transmission Type":"manual"},
// {VIN:randomVin(), Make:"Kia", Model:"rio", Mileage:103335, "Title Status":"unknown"},
// {VIN:randomVin(), Make:"Hyundai", Model:"elantra", Mileage:54225, "Title Status":"unknown", "Transmission Type":"automatic"},
// {VIN:randomVin(), Make:"Mazda", Model:"3", Mileage:67114},
