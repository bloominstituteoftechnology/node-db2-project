
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        {id: 1, make: 'Kia', model:'Rio',VIN:1234567,mileage:126000,title_status:"clean",transmission_type:"automatic"},
        {id: 2, make: 'Hyundai', model:'Elantra',VIN:1928374,mileage:160000,title_status:"scrap",transmission_type:"automatic"},
        {id: 3, make: 'Saab', model:'900se',VIN:3728647,mileage:145700,title_status:"clean",transmission_type:"standard"}
      ]);
    });
};
