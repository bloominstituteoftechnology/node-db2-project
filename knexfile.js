module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/car-dealer.db3',
        },
        usNullAsDefault: true,
        migration: {
            directory: './data/migrations',
        },
        // seeds: {
        //     directory: './data/seeds',
        // },
    },
};