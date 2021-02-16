
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin:'H73KOIJHD83JGHT9S', make:'Honda', model:'Civic', mileage:'63000', transmission:'Automatic', titlestatus:'Clear'},
        {vin:'ABC123HYT6DK96ST4', make:'Subaru', model:'Wrx Sti', mileage:'80252', transmission:'Manual', titlestatus:'Clear'},
        {vin:'N8EJKJ5FTCST83GY4', make:'Datsun', model:'240z', mileage:'35287', transmission:'Manual', titlestatus:'Rebuilt'},
        {vin:'MLO0987HBHU78T890', make:'Koenigsegg', model:'Agera R', mileage:'40000', transmission:'Manual', titlestatus:'Clear'},
        {vin:'QOPOWI809723EUGUG', make:'Tesla', model:'Model S', mileage:'68429', transmission:'Automatic', titlestatus:'Clear'},
        {vin:'78IYHUKGN7YUE2WDE', make:'Mazda', model:'Rx-7', mileage:'87395', transmission:'Manual', titlestatus:'Rebuilt'}
      ]);
    });
};
