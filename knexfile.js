module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/auth.db3',
    },    
    migrations: {
      directory: './database/migrations', // <-- migrations directory 
    },
    seeds: {
      directory: './database/seeds', // <-- seeds directory 
    },
  },
};