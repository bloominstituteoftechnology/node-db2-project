// Update with your config settings.
require('dotenv').config()
module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './data/car-dealer.db3'
  //   },
  //   useNullAsDefault: true,
  // },

  development: {
    client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        database: 'web2',
        password: process.env.DB_PASSWORD,
      },
  },
};
