
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('zoo_emails').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('zoo_emails').insert([
        {zoo_id: 1, email: 'zoo@zoomail.com'},
        {zoo_id: 2, email: 'zoos@zoomail.com'},
        {zoo_id: 3, email: 'zoozy@zoomail.com'}
      ]);
    });
};
