// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/zoodb.db'
    },
    migrations: {
      tableName: 'migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localost',
      database: 'zoodb',
      user:     'dan',
      password: '007'
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
