// Update with your config settings 

module.exports = { 
    development: {
        client: 'sqlite3',
        connection: {
            filename: './database/jungle.sqlite3'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'lambda',
            user: 'luis',
            password: 'pass',
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