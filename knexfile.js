// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/zoodb.sqlite3' //zoodb.db
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
      database: 'zoodb',
      user: 'kia',
      password: 'pass'
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
