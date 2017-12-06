
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_name: 'Bob', user_password: 'rowValue1'},
        {user_name: 'Sam', user_password: 'rowValue2'},
        {user_name: 'Jim', user_password: 'rowValue3'}
      ]);
    })
    .catch(err => {
      console.log("error here");
    });
};
