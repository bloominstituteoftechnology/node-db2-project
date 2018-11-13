Relational

- well defined structure for the data
- relationships that go more than 2 level deep
- lots fo writes

Non Relational

- shallow relationships
- lots fo reads, less writes
- unstructured data

There are different types of NoSQL (Not Only SQL)

- document
- graph
- key-value
- object
- more...

{ } > [ ]

- categories
  - products
    - orders
      - order lines

Remember to save (Write Changes) your DB file.

Connecting from Node.

- raw driver
- query builder <== we'll use one of these
- full blown ORM (Object Relational Mapper)

Steps

- npm init -y
- yarn add express knex sqlite3
- yarn add nodemon -D
- npx knex init > generated the knexfile.js
  - or install knex globally `yarn global add knex` or `npm i -g knex` and just do `knex init`
- update knexfile to point to right file
- add `useNullAsDefault: true` to the development key inside knexfile.js
