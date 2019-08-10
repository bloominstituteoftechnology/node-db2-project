
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('vehicles').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('vehicles').insert([
        {make: 'Chevy' ,
          model: 'Camaro',
        year: 2013, condition: 'excellent',
     },
      {make: 'Toyota',
    model:'Corrola',
    year: 2018,
    condition:'good',
 
  }
      ]);
    });
};
