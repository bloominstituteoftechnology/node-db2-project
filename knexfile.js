//TODO: KNEX-FLOW: This file was made after using 'npm i -g knex' then 'npm i knex sqlite3', once executing 'knex init' this file is made by Knex in the root of the project //
//! The development object needs to be updated with a few things: A correct connect path in the filename key, useNullAsDefault: true is added, a migrations object is added - theses files are made through 'knex migrate:make' commands! !// 

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/car-dealer.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  },


  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
