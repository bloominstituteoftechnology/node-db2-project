
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
        
          "model": "Ford",
          "VIN": "1278675344",
          "make": "mustang",
          "Milage": 40545600,
          "transmission_type": "manual",
          "title_status": "Salvage"
        },
        {
        
          "model": "BMW",
          "VIN": "5756738",
          "make": "S-class",
          "Milage": 2000,
          "transmission_type": null,
          "title_status": "clean"
        },
        {
        
          "model": "Ford",
          "VIN": "685680",
          "make": "mustang",
          "Milage": 5478,
          "transmission_type": "automatic",
          "title_status": "clean"
        }
      ]);
    });
};
