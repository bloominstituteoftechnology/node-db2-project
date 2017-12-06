migrations: logs the history of all the changes made to the databases since the creation of the database itself.

seeding: the ability to test your database 

sql injection attacks protection: protect against sql-query attacks
sql supports callbacks, promises and streams. We will use promises.
This is also a query builder not a ORM. It is also standardized which Knex provides which uses connector which translates query to the specific database you are using. 

Add knex using npm install knex
Add sqlite3 using npm install sqlite3
add sql using npm install mysql
initialize knex using knex init to create new knexfile.js