
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('videos').del()
    .then(function () {
      // Inserts seed entries
      return knex('videos').insert([
        {user_id: 2, video_name: 'Dark Tower p1'},
        {user_id: 2, video_name: 'Dark Tower p2'},
        {user_id: 2, video_name: 'Dark Tower p3'}
      ]);
    })
    .catch(err => {
      console.log("error here");
    });
};
