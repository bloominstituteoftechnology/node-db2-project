
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bears').del()
    .then(function () {
      // Inserts seed entries
      return knex('bears').insert([
        {'zooId': 1, species: "Grizzly", latinName: 'Ursos Arctos'},
        {'zooId': 2, species: 'Smokey', latinName: 'The Bear'},
        {'zooId': 3, species: 'Brown', latinName: 'Winnie The Poo Bear'}
      ]);
    });
};
