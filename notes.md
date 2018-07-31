https://knexjs.org/
    ^querry builder

Access RDB from Node
    -raw or native driver
    -querry builder
    -Object REaltional Mapper (ORM) 
        -bookshelf, sequelize, typeORM

Why Knex?
-protection against SQL injection
-connection pooling
-migrations
-seedings
-supports promises, callbacks, streams (we not use stream)
-schema builder. use ddl statements like create table, drop tables
-querry builder with a clean js api
-standardization. normalizes DB dialects

how to use it
-install it
-install a db driver
-initialize knex (knex init)

yarn add knex
driver / config 
yarn add sqlite3
yarn global add knex
initialize knex (knex init)



The steps I did for the project.
`git clone` ...
`cd RDBMS-API-Mini`
`yarn`
`yarn add global knex`
`yarn add knex`
`yarn knex init`
`yarn add sqlite3`

then make database in db_browser

then in knexfile.js - point to db file,  add useNullAsDefault..
module.exports = {

```javascript
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cs11-07312018.sqlite3'
    },
    useNullAsDefault: true, //to prevent warning
  }
};
```

#### Tables
>Create the following tables for the Zoos and Bears collection.
>
>Zoos Table should have the following columns:
>
>id: primary key, automincrements.
>name: unique, alphanumeric up to 255 characters long.
>created_at: should automatically default to the current date and time.
>Bears Table should have the following columns:

>id: primary key, automincrements.
>zooId: an integer that relates this table to the zoos table. Enforce data integrity.
>species: unique, alphanumeric up to 80 characters long.
>latinName: alphanumeric up to 80 characters long.
>createdAt: should automatically default to the current date and time.

```sql
CREATE TABLE `zoos` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT UNIQUE
);

CREATE TABLE `zoos` (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT UNIQUE,
	`created_at`	INTEGER DEFAULT CURRENT_TIMESTAMP
);
```