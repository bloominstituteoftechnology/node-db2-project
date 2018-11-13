#Relational
- well defined structure for the data
- relationships that go more than 2 level deep
- lots of writes

Non Relational

- shallow relationships
- lots of reads, less writes
- unstructured data

#There are different types of NoSQL (Not only SQL)
- document
- graph
- key-value pairs
- object databases
- more...

- categories
  - products
   -orders
    -order lines

Remember to save (Write Changes) your DB file.

Connecting form Node.
- raw driver
- query build <== we'll use one of these
- full blown ORM (Object Relation Mapper)

#Steps
- npm init -y
- yarn add express knex sqlite3
- yarn add nodemon -D
- npx knex init > generated the knexfile.js
 - or install knex globally -> yarn global add knex or npm i -g knex and then do knex init
