Database

*Tables (collection): data goes here
 *Rows (document): a record in the table
  *Columns (Field): a property of each record

References -> Foreign Keys

  application -> objects
  Database -> relations

connect from node
-raw driver (connector) [sql injections]
-query builder
-ORM = Object reational mapper>

install 
*mysql
*express
*knex
*bodyparser
*nodemon...add a dev dependency


knex init

knex migrate:make CreateZoosTable
knex migrate:latest