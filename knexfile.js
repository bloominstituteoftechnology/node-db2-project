// knex just connets to the database and now can run migration modules 
// Update with your config settings.

module.exports = {
    client: "sqlite3", // specifying the DBMS
    useNUllAsDefault: true, // a flag  that's required for SQlite 
    connection: {
      filename: "./data/car-dealer.db3", //location of our database file 
     
    },
}