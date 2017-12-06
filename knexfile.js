// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/videosdb.db'
    },
    migrations: {
      tableName: 'migrations'
    },
    useNullAsDefault: true,

  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user:     'sam',
      password: 'kim'
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
