
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 'SALVT2BG1CH654491', make:'Volkswagen', model:'Jetta', mileage: 4165, transmission:'Automatic', title_status:'clean'},
        {VIN: '1G2NE55D5SM534479', make:'Volkswagen', model:'GTD', mileage:7641, transmission:'Automatic', title_status:'clean'},
        {VIN: 'WDCDA5HB2CA011690', make:'Volkswagen', model:'1500', mileage: 2107, transmission:'Automatic', title_status:'salvage'},
        {VIN: '1GCCT14R0H2164173', make:'Volkswagen', model:'Corrado', mileage: 8512, transmission:'Automatic', title_status:'salvage'},
        {VIN: '1HGCT2B88DA000025', make:'GMC', model:'Acadia', mileage: 4072, transmission:'Automatic', title_status:'clean'},
        {VIN: 'JKBVNKD167A013982', make:'GMC', model:'Autonomy', mileage: 7027, transmission:'Automatic', title_status:'clean'},
        {VIN: '5XYKT3A17BG157871', make:'GMC', model:'EV1', mileage: 5737, transmission:'Automatic', title_status:'clean'},
        {VIN: 'JT3HJ85J6T0133046', make:'GMC', model:'Safari', mileage: 179, transmission:'Automatic', title_status:'salvage'},
        {VIN: 'JH4KA3240JC014910', make:'GMC', model:'Yukon', mileage: 6300, transmission:'Automatic', title_status:'salvage'},
        {VIN: '2HGES15252H603204', make:'Land Rover', model:'109', mileage: 5841, transmission:'Automated Manual', title_status:'clean'},
        {VIN: '1FVAF3CV84DM31815', make:'Land Rover', model:'Range Rover Sport', mileage: 521, transmission:'Automated Manual', title_status:'clean'}
      ]);
    });
};
