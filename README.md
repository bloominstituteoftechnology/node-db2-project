# Building an API using a Relational Database Mini

Topics:
  * Relational Databases
  * MySQL and SQL Lite
  * Query Builders
  * Knex
  * Create/Read/Update/Delete operations

## Description
You'll write a server that lets you create and read Zoos and Bears stored in a Relational Database. Much
of the knowledge from Node and Express will carry over to this mini project,
where you'll interface with a database in your route handlers.

## Requirements
For this mini sprint you'll need to have SQLite3 and MySQL intalled. MySQL must be running.

#### Installation Videos:
- [MySQL Installation video for Windows](https://www.youtube.com/watch?v=uErU2VBv2WE)
- [MySQL Installation video for MacOS](https://www.youtube.com/watch?v=UcpHkYfWarM)
- [MySQL Installation video for Ubuntu](https://www.youtube.com/watch?v=uqaoGTnxqNw)

#### Resources
- [SQL Tryit Editor](https://www.w3schools.com/sql/trysql.asp?filename=trysql_op_in)
- [Knex Cheat Sheet](https://devhints.io/knex)
- [Knex Query Playground/Lab](http://michaelavila.com/knex-querylab/)

#### Download Links
- [MySQL Workbench download link](https://dev.mysql.com/downloads/workbench/)
- [SQLite 3 download link](https://www.sqlite.org/download.html)
- [DB Browser for SQLite download link](http://sqlitebrowser.org/)

## Running the Project
* Fork and Clone this project.
* `cd` into your project folder.
* Run `npm install` or `yarn` to download the dependencies.
* Write your implementation inside `server.js` to satisfy the specifications listed below.
* To start the API server, run `npm start` or `yarn start`.
* Use _Postman_ to test your API.

## Specifications

### Tables
Create the following tables for the Zoos and Bears collection. 

Zoos Table should have the following columns:
- id: primary key, automincrements.
- name: unique, alphanumeric up to 255 characters long.
- created_at: should automatically default to the current date and time.

Bears Table should have the following columns:
- id: primary key, automincrements.
- zooId: an integer that relates this table to the zoos table. Enforce data integrity.
- species: unique, alphanumeric up to 80 characters long.
- latinName: alphanumeric up to 80 characters long.
- createdAt: should automatically default to the current date and time.


### `POST /zoos`
When the client makes a `POST` request to `/api/zoos` a new _zoo_ should be created in the zoos table:

- Ensure the client passes a name parameter in the request
  body. If there's an error, respond with an appropriate status code, and send
  a JSON response of the form `{ error: "Some useful error message" }`.
- return de `id` of the inserted zoo.

### `GET /zoos`
When the client makes a `GET` request to `/api/zoos`, return a list of all the zoos in the database. 
Remember to handle the errors and return the correct status code.

### `GET /zoos/:id`
When the client makes a `GET` request to `/api/zoos/:id` (remember, `:id` is a
parameter embedded in the URL, not in the query-string):

- Find the zoo associated with the given `id`. Remember to handle errors and send the correct status code.
