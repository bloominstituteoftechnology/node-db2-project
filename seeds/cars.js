
exports.seed = async function(knex) {
  await knex('cars').truncate();
  
  await knex('cars').insert([
    {
      VIN: 'hj34567e9754',
      make: 'jeep',
      model: 'liberty',
      mileage: 85930,
      transmission: 'automatic',
      titleStatus: 'clean',
    },
    {
      VIN: 'gd89wq7wehsiqwe',
      make: 'honda',
      model: 'civic',
      mileage: 76738,
      transmission: 'automatic',
      titleStatus: 'clean',
    },
    {
      VIN: 'dhq733quoiwhe',
      make: 'toyota',
      model: 'highlander',
      mileage: 7854865,
      transmission: 'manual',
      titleStatus: 'clean',
    },
    {
      VIN: 'lsjdh8iw09',
      make: 'chevy',
      model: 'silverado',
      mileage: 765876,
      transmission: 'automatic',
      titleStatus: 'clean',
    },
    {
      VIN: 'hsd9237y21h02',
      make: 'ford',
      model: 'f150',
      mileage: 8123791,
      transmission: 'automatic',
      titleStatus: 'clean',
    },
    {
      VIN: 'aisdhy039372yea',
      make: 'kia',
      model: 'soul',
      mileage: 8347908,
      transmission: 'manual',
      titleStatus: 'clean',
    },
  ])
};
