// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3' //set one up here for knex to create it 
    },
    useNullAsDefault:true, // need this here when using SQLite
    migrations: { //builds the database, blueprint for the database
      directory: "./data/migrations" //where are these files?
    },
    seeds:{ //fills up the database
      directory: "./data/seeds"
    }
  },

  staging: {

  },

  production: {
  }

};
