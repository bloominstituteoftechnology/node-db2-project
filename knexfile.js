module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/car-dealer.db3'
      },
  
      useNullAsDefault: true,
      migrations: {
        directory: "./data/migrations"
      },
      seeds: {
        directory: "./data/seeds"
      }
    },
  
    // staging: {
    //   client: 'postgresql',
    //   connection: {
    //     database: 'my_db',
    //     user:     'username',
    //     password: 'password'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: 'knex_migrations'
    //   }
    // },
    // production: {
    //   useNullAsDefault: true,
    //   client: 'pg',
    //   connection: 
    //     process.env.DATABASE_URL
    //   ,
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     directory: "./data/migrations"
    //   },
    //   seeds: {
    //     directory: "./data/seeds"
  
    //   }
  
    // }
  
  };