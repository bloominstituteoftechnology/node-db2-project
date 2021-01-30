
exports.seed = async function(knex) {
   await knex("cars").truncate();
   await knex("cars").insert([
     {VIN:"abcd",make:'TESLA',model:'Model S',mileage:300,transmission_type:'electric',title:'clean'},
     {VIN:"zyxw",make:'TESLA',model:'Model Y',mileage:280,transmission_type:'electric',title:'clean'},
     {VIN:"efgh",make:'TESLA',model:'Model X',mileage:350,transmission_type:'electric',title:'clean'},
     {VIN:"ijkl",make:'TESLA',model:'Model 3',mileage:280,transmission_type:'electric',title:'clean'}
   ])
};
