
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {"VIN":"1GTG5BE37F1061816","make":"Saab","model":"9-7X","transmission type":null,"milage":17389.66,"title status":"clean"},
        {"VIN":"NM0AS8F7XE1154439","make":"Jensen","model":"Interceptor","transmission type":null,"milage":253283.36,"title status":null},
        {"VIN":"JH4DC54836S696502","make":"Volkswagen","model":"Eos","transmission type":"manual","milage":148967.59,"title status":null},
        {"VIN":"WA1LMAFE1BD598695","make":"Jeep","model":"Patriot","transmission type":null,"milage":183530.95,"title status":"rebuilt"}
      ]);
    });
};
